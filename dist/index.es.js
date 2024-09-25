import hr from "react";
var Q0 = { exports: {} }, Ua = {}, Zm = { exports: {} }, V0 = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var UT;
function K_() {
  return UT || (UT = 1, function(h) {
    function T(ee, ke) {
      var fe = ee.length;
      ee.push(ke);
      e: for (; 0 < fe; ) {
        var ht = fe - 1 >>> 1, gt = ee[ht];
        if (0 < Y(gt, ke)) ee[ht] = ke, ee[fe] = gt, fe = ht;
        else break e;
      }
    }
    function y(ee) {
      return ee.length === 0 ? null : ee[0];
    }
    function A(ee) {
      if (ee.length === 0) return null;
      var ke = ee[0], fe = ee.pop();
      if (fe !== ke) {
        ee[0] = fe;
        e: for (var ht = 0, gt = ee.length, xn = gt >>> 1; ht < xn; ) {
          var Un = 2 * (ht + 1) - 1, ca = ee[Un], en = Un + 1, mr = ee[en];
          if (0 > Y(ca, fe)) en < gt && 0 > Y(mr, ca) ? (ee[ht] = mr, ee[en] = fe, ht = en) : (ee[ht] = ca, ee[Un] = fe, ht = Un);
          else if (en < gt && 0 > Y(mr, fe)) ee[ht] = mr, ee[en] = fe, ht = en;
          else break e;
        }
      }
      return ke;
    }
    function Y(ee, ke) {
      var fe = ee.sortIndex - ke.sortIndex;
      return fe !== 0 ? fe : ee.id - ke.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var z = performance;
      h.unstable_now = function() {
        return z.now();
      };
    } else {
      var S = Date, pe = S.now();
      h.unstable_now = function() {
        return S.now() - pe;
      };
    }
    var se = [], ce = [], Me = 1, $ = null, ue = 3, re = !1, xe = !1, Ze = !1, Ge = typeof setTimeout == "function" ? setTimeout : null, wt = typeof clearTimeout == "function" ? clearTimeout : null, Ee = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function Ie(ee) {
      for (var ke = y(ce); ke !== null; ) {
        if (ke.callback === null) A(ce);
        else if (ke.startTime <= ee) A(ce), ke.sortIndex = ke.expirationTime, T(se, ke);
        else break;
        ke = y(ce);
      }
    }
    function ot(ee) {
      if (Ze = !1, Ie(ee), !xe) if (y(se) !== null) xe = !0, st(Ne);
      else {
        var ke = y(ce);
        ke !== null && Ut(ot, ke.startTime - ee);
      }
    }
    function Ne(ee, ke) {
      xe = !1, Ze && (Ze = !1, wt(Yt), Yt = -1), re = !0;
      var fe = ue;
      try {
        for (Ie(ke), $ = y(se); $ !== null && (!($.expirationTime > ke) || ee && !Et()); ) {
          var ht = $.callback;
          if (typeof ht == "function") {
            $.callback = null, ue = $.priorityLevel;
            var gt = ht($.expirationTime <= ke);
            ke = h.unstable_now(), typeof gt == "function" ? $.callback = gt : $ === y(se) && A(se), Ie(ke);
          } else A(se);
          $ = y(se);
        }
        if ($ !== null) var xn = !0;
        else {
          var Un = y(ce);
          Un !== null && Ut(ot, Un.startTime - ke), xn = !1;
        }
        return xn;
      } finally {
        $ = null, ue = fe, re = !1;
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
        var ke = !0;
        try {
          ke = Xe(!0, ee);
        } finally {
          ke ? oe() : (Ct = !1, Xe = null);
        }
      } else Ct = !1;
    }
    var oe;
    if (typeof Ee == "function") oe = function() {
      Ee(Ve);
    };
    else if (typeof MessageChannel < "u") {
      var Fe = new MessageChannel(), vt = Fe.port2;
      Fe.port1.onmessage = Ve, oe = function() {
        vt.postMessage(null);
      };
    } else oe = function() {
      Ge(Ve, 0);
    };
    function st(ee) {
      Xe = ee, Ct || (Ct = !0, oe());
    }
    function Ut(ee, ke) {
      Yt = Ge(function() {
        ee(h.unstable_now());
      }, ke);
    }
    h.unstable_IdlePriority = 5, h.unstable_ImmediatePriority = 1, h.unstable_LowPriority = 4, h.unstable_NormalPriority = 3, h.unstable_Profiling = null, h.unstable_UserBlockingPriority = 2, h.unstable_cancelCallback = function(ee) {
      ee.callback = null;
    }, h.unstable_continueExecution = function() {
      xe || re || (xe = !0, st(Ne));
    }, h.unstable_forceFrameRate = function(ee) {
      0 > ee || 125 < ee ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : Jt = 0 < ee ? Math.floor(1e3 / ee) : 5;
    }, h.unstable_getCurrentPriorityLevel = function() {
      return ue;
    }, h.unstable_getFirstCallbackNode = function() {
      return y(se);
    }, h.unstable_next = function(ee) {
      switch (ue) {
        case 1:
        case 2:
        case 3:
          var ke = 3;
          break;
        default:
          ke = ue;
      }
      var fe = ue;
      ue = ke;
      try {
        return ee();
      } finally {
        ue = fe;
      }
    }, h.unstable_pauseExecution = function() {
    }, h.unstable_requestPaint = function() {
    }, h.unstable_runWithPriority = function(ee, ke) {
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
      var fe = ue;
      ue = ee;
      try {
        return ke();
      } finally {
        ue = fe;
      }
    }, h.unstable_scheduleCallback = function(ee, ke, fe) {
      var ht = h.unstable_now();
      switch (typeof fe == "object" && fe !== null ? (fe = fe.delay, fe = typeof fe == "number" && 0 < fe ? ht + fe : ht) : fe = ht, ee) {
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
      return gt = fe + gt, ee = { id: Me++, callback: ke, priorityLevel: ee, startTime: fe, expirationTime: gt, sortIndex: -1 }, fe > ht ? (ee.sortIndex = fe, T(ce, ee), y(se) === null && ee === y(ce) && (Ze ? (wt(Yt), Yt = -1) : Ze = !0, Ut(ot, fe - ht))) : (ee.sortIndex = gt, T(se, ee), xe || re || (xe = !0, st(Ne))), ee;
    }, h.unstable_shouldYield = Et, h.unstable_wrapCallback = function(ee) {
      var ke = ue;
      return function() {
        var fe = ue;
        ue = ke;
        try {
          return ee.apply(this, arguments);
        } finally {
          ue = fe;
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
var zT;
function Z_() {
  return zT || (zT = 1, function(h) {
    process.env.NODE_ENV !== "production" && function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var T = !1, y = !1, A = 5;
      function Y(ne, Ue) {
        var rt = ne.length;
        ne.push(Ue), pe(ne, Ue, rt);
      }
      function z(ne) {
        return ne.length === 0 ? null : ne[0];
      }
      function S(ne) {
        if (ne.length === 0)
          return null;
        var Ue = ne[0], rt = ne.pop();
        return rt !== Ue && (ne[0] = rt, se(ne, rt, 0)), Ue;
      }
      function pe(ne, Ue, rt) {
        for (var bt = rt; bt > 0; ) {
          var jt = bt - 1 >>> 1, Fn = ne[jt];
          if (ce(Fn, Ue) > 0)
            ne[jt] = Ue, ne[bt] = Fn, bt = jt;
          else
            return;
        }
      }
      function se(ne, Ue, rt) {
        for (var bt = rt, jt = ne.length, Fn = jt >>> 1; bt < Fn; ) {
          var pn = (bt + 1) * 2 - 1, kr = ne[pn], Bt = pn + 1, Wr = ne[Bt];
          if (ce(kr, Ue) < 0)
            Bt < jt && ce(Wr, kr) < 0 ? (ne[bt] = Wr, ne[Bt] = Ue, bt = Bt) : (ne[bt] = kr, ne[pn] = Ue, bt = pn);
          else if (Bt < jt && ce(Wr, Ue) < 0)
            ne[bt] = Wr, ne[Bt] = Ue, bt = Bt;
          else
            return;
        }
      }
      function ce(ne, Ue) {
        var rt = ne.sortIndex - Ue.sortIndex;
        return rt !== 0 ? rt : ne.id - Ue.id;
      }
      var Me = 1, $ = 2, ue = 3, re = 4, xe = 5;
      function Ze(ne, Ue) {
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
      var ot = 1073741823, Ne = -1, Ct = 250, Xe = 5e3, Yt = 1e4, Jt = ot, pt = [], Et = [], Ve = 1, oe = null, Fe = ue, vt = !1, st = !1, Ut = !1, ee = typeof setTimeout == "function" ? setTimeout : null, ke = typeof clearTimeout == "function" ? clearTimeout : null, fe = typeof setImmediate < "u" ? setImmediate : null;
      typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
      function ht(ne) {
        for (var Ue = z(Et); Ue !== null; ) {
          if (Ue.callback === null)
            S(Et);
          else if (Ue.startTime <= ne)
            S(Et), Ue.sortIndex = Ue.expirationTime, Y(pt, Ue);
          else
            return;
          Ue = z(Et);
        }
      }
      function gt(ne) {
        if (Ut = !1, ht(ne), !st)
          if (z(pt) !== null)
            st = !0, _t(xn);
          else {
            var Ue = z(Et);
            Ue !== null && at(gt, Ue.startTime - ne);
          }
      }
      function xn(ne, Ue) {
        st = !1, Ut && (Ut = !1, dn()), vt = !0;
        var rt = Fe;
        try {
          var bt;
          if (!y) return Un(ne, Ue);
        } finally {
          oe = null, Fe = rt, vt = !1;
        }
      }
      function Un(ne, Ue) {
        var rt = Ue;
        for (ht(rt), oe = z(pt); oe !== null && !T && !(oe.expirationTime > rt && (!ne || M())); ) {
          var bt = oe.callback;
          if (typeof bt == "function") {
            oe.callback = null, Fe = oe.priorityLevel;
            var jt = oe.expirationTime <= rt, Fn = bt(jt);
            rt = h.unstable_now(), typeof Fn == "function" ? oe.callback = Fn : oe === z(pt) && S(pt), ht(rt);
          } else
            S(pt);
          oe = z(pt);
        }
        if (oe !== null)
          return !0;
        var pn = z(Et);
        return pn !== null && at(gt, pn.startTime - rt), !1;
      }
      function ca(ne, Ue) {
        switch (ne) {
          case Me:
          case $:
          case ue:
          case re:
          case xe:
            break;
          default:
            ne = ue;
        }
        var rt = Fe;
        Fe = ne;
        try {
          return Ue();
        } finally {
          Fe = rt;
        }
      }
      function en(ne) {
        var Ue;
        switch (Fe) {
          case Me:
          case $:
          case ue:
            Ue = ue;
            break;
          default:
            Ue = Fe;
            break;
        }
        var rt = Fe;
        Fe = Ue;
        try {
          return ne();
        } finally {
          Fe = rt;
        }
      }
      function mr(ne) {
        var Ue = Fe;
        return function() {
          var rt = Fe;
          Fe = Ue;
          try {
            return ne.apply(this, arguments);
          } finally {
            Fe = rt;
          }
        };
      }
      function gn(ne, Ue, rt) {
        var bt = h.unstable_now(), jt;
        if (typeof rt == "object" && rt !== null) {
          var Fn = rt.delay;
          typeof Fn == "number" && Fn > 0 ? jt = bt + Fn : jt = bt;
        } else
          jt = bt;
        var pn;
        switch (ne) {
          case Me:
            pn = Ne;
            break;
          case $:
            pn = Ct;
            break;
          case xe:
            pn = Jt;
            break;
          case re:
            pn = Yt;
            break;
          case ue:
          default:
            pn = Xe;
            break;
        }
        var kr = jt + pn, Bt = {
          id: Ve++,
          callback: Ue,
          priorityLevel: ne,
          startTime: jt,
          expirationTime: kr,
          sortIndex: -1
        };
        return jt > bt ? (Bt.sortIndex = jt, Y(Et, Bt), z(pt) === null && Bt === z(Et) && (Ut ? dn() : Ut = !0, at(gt, jt - bt))) : (Bt.sortIndex = kr, Y(pt, Bt), !st && !vt && (st = !0, _t(xn))), Bt;
      }
      function Wn() {
      }
      function fa() {
        !st && !vt && (st = !0, _t(xn));
      }
      function Gn() {
        return z(pt);
      }
      function _r(ne) {
        ne.callback = null;
      }
      function fn() {
        return Fe;
      }
      var wn = !1, zn = null, An = -1, qn = A, x = -1;
      function M() {
        var ne = h.unstable_now() - x;
        return !(ne < qn);
      }
      function V() {
      }
      function te(ne) {
        if (ne < 0 || ne > 125) {
          console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
          return;
        }
        ne > 0 ? qn = Math.floor(1e3 / ne) : qn = A;
      }
      var Z = function() {
        if (zn !== null) {
          var ne = h.unstable_now();
          x = ne;
          var Ue = !0, rt = !0;
          try {
            rt = zn(Ue, ne);
          } finally {
            rt ? q() : (wn = !1, zn = null);
          }
        } else
          wn = !1;
      }, q;
      if (typeof fe == "function")
        q = function() {
          fe(Z);
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
      function _t(ne) {
        zn = ne, wn || (wn = !0, q());
      }
      function at(ne, Ue) {
        An = ee(function() {
          ne(h.unstable_now());
        }, Ue);
      }
      function dn() {
        ke(An), An = -1;
      }
      var Ga = V, yr = null;
      h.unstable_IdlePriority = xe, h.unstable_ImmediatePriority = Me, h.unstable_LowPriority = re, h.unstable_NormalPriority = ue, h.unstable_Profiling = yr, h.unstable_UserBlockingPriority = $, h.unstable_cancelCallback = _r, h.unstable_continueExecution = fa, h.unstable_forceFrameRate = te, h.unstable_getCurrentPriorityLevel = fn, h.unstable_getFirstCallbackNode = Gn, h.unstable_next = en, h.unstable_pauseExecution = Wn, h.unstable_requestPaint = Ga, h.unstable_runWithPriority = ca, h.unstable_scheduleCallback = gn, h.unstable_shouldYield = M, h.unstable_wrapCallback = mr, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    }();
  }(j0)), j0;
}
var AT;
function ZT() {
  return AT || (AT = 1, process.env.NODE_ENV === "production" ? Zm.exports = K_() : Zm.exports = Z_()), Zm.exports;
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
var FT;
function J_() {
  if (FT) return Ua;
  FT = 1;
  var h = hr, T = ZT();
  function y(n) {
    for (var r = "https://reactjs.org/docs/error-decoder.html?invariant=" + n, l = 1; l < arguments.length; l++) r += "&args[]=" + encodeURIComponent(arguments[l]);
    return "Minified React error #" + n + "; visit " + r + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var A = /* @__PURE__ */ new Set(), Y = {};
  function z(n, r) {
    S(n, r), S(n + "Capture", r);
  }
  function S(n, r) {
    for (Y[n] = r, n = 0; n < r.length; n++) A.add(r[n]);
  }
  var pe = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), se = Object.prototype.hasOwnProperty, ce = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, Me = {}, $ = {};
  function ue(n) {
    return se.call($, n) ? !0 : se.call(Me, n) ? !1 : ce.test(n) ? $[n] = !0 : (Me[n] = !0, !1);
  }
  function re(n, r, l, o) {
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
    if (r === null || typeof r > "u" || re(n, r, l, o)) return !0;
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
    (c !== null ? c.type !== 0 : o || !(2 < r.length) || r[0] !== "o" && r[0] !== "O" || r[1] !== "n" && r[1] !== "N") && (xe(r, l, c, o) && (l = null), o || c === null ? ue(r) && (l === null ? n.removeAttribute(r) : n.setAttribute(r, "" + l)) : c.mustUseProperty ? n[c.propertyName] = l === null ? c.type === 3 ? !1 : "" : l : (r = c.attributeName, o = c.attributeNamespace, l === null ? n.removeAttribute(r) : (c = c.type, l = c === 3 || c === 4 && l === !0 ? "" : "" + l, o ? n.setAttributeNS(o, r, l) : n.setAttribute(r, l))));
  }
  var ot = h.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, Ne = Symbol.for("react.element"), Ct = Symbol.for("react.portal"), Xe = Symbol.for("react.fragment"), Yt = Symbol.for("react.strict_mode"), Jt = Symbol.for("react.profiler"), pt = Symbol.for("react.provider"), Et = Symbol.for("react.context"), Ve = Symbol.for("react.forward_ref"), oe = Symbol.for("react.suspense"), Fe = Symbol.for("react.suspense_list"), vt = Symbol.for("react.memo"), st = Symbol.for("react.lazy"), Ut = Symbol.for("react.offscreen"), ee = Symbol.iterator;
  function ke(n) {
    return n === null || typeof n != "object" ? null : (n = ee && n[ee] || n["@@iterator"], typeof n == "function" ? n : null);
  }
  var fe = Object.assign, ht;
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
  var xn = !1;
  function Un(n, r) {
    if (!n || xn) return "";
    xn = !0;
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
`), m = c.length - 1, C = d.length - 1; 1 <= m && 0 <= C && c[m] !== d[C]; ) C--;
        for (; 1 <= m && 0 <= C; m--, C--) if (c[m] !== d[C]) {
          if (m !== 1 || C !== 1)
            do
              if (m--, C--, 0 > C || c[m] !== d[C]) {
                var w = `
` + c[m].replace(" at new ", " at ");
                return n.displayName && w.includes("<anonymous>") && (w = w.replace("<anonymous>", n.displayName)), w;
              }
            while (1 <= m && 0 <= C);
          break;
        }
      }
    } finally {
      xn = !1, Error.prepareStackTrace = l;
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
        return n = Un(n.type, !1), n;
      case 11:
        return n = Un(n.type.render, !1), n;
      case 1:
        return n = Un(n.type, !0), n;
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
      case oe:
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
  function mr(n) {
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
  function Wn(n) {
    var r = n.type;
    return (n = n.nodeName) && n.toLowerCase() === "input" && (r === "checkbox" || r === "radio");
  }
  function fa(n) {
    var r = Wn(n) ? "checked" : "value", l = Object.getOwnPropertyDescriptor(n.constructor.prototype, r), o = "" + n[r];
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
  function Gn(n) {
    n._valueTracker || (n._valueTracker = fa(n));
  }
  function _r(n) {
    if (!n) return !1;
    var r = n._valueTracker;
    if (!r) return !0;
    var l = r.getValue(), o = "";
    return n && (o = Wn(n) ? n.checked ? "true" : "false" : n.value), n = o, n !== l ? (r.setValue(n), !0) : !1;
  }
  function fn(n) {
    if (n = n || (typeof document < "u" ? document : void 0), typeof n > "u") return null;
    try {
      return n.activeElement || n.body;
    } catch {
      return n.body;
    }
  }
  function wn(n, r) {
    var l = r.checked;
    return fe({}, r, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: l ?? n._wrapperState.initialChecked });
  }
  function zn(n, r) {
    var l = r.defaultValue == null ? "" : r.defaultValue, o = r.checked != null ? r.checked : r.defaultChecked;
    l = gn(r.value != null ? r.value : l), n._wrapperState = { initialChecked: o, initialValue: l, controlled: r.type === "checkbox" || r.type === "radio" ? r.checked != null : r.value != null };
  }
  function An(n, r) {
    r = r.checked, r != null && Ie(n, "checked", r, !1);
  }
  function qn(n, r) {
    An(n, r);
    var l = gn(r.value), o = r.type;
    if (l != null) o === "number" ? (l === 0 && n.value === "" || n.value != l) && (n.value = "" + l) : n.value !== "" + l && (n.value = "" + l);
    else if (o === "submit" || o === "reset") {
      n.removeAttribute("value");
      return;
    }
    r.hasOwnProperty("value") ? M(n, r.type, l) : r.hasOwnProperty("defaultValue") && M(n, r.type, gn(r.defaultValue)), r.checked == null && r.defaultChecked != null && (n.defaultChecked = !!r.defaultChecked);
  }
  function x(n, r, l) {
    if (r.hasOwnProperty("value") || r.hasOwnProperty("defaultValue")) {
      var o = r.type;
      if (!(o !== "submit" && o !== "reset" || r.value !== void 0 && r.value !== null)) return;
      r = "" + n._wrapperState.initialValue, l || r === n.value || (n.value = r), n.defaultValue = r;
    }
    l = n.name, l !== "" && (n.name = ""), n.defaultChecked = !!n._wrapperState.initialChecked, l !== "" && (n.name = l);
  }
  function M(n, r, l) {
    (r !== "number" || fn(n.ownerDocument) !== n) && (l == null ? n.defaultValue = "" + n._wrapperState.initialValue : n.defaultValue !== "" + l && (n.defaultValue = "" + l));
  }
  var V = Array.isArray;
  function te(n, r, l, o) {
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
    return fe({}, r, { value: void 0, defaultValue: void 0, children: "" + n._wrapperState.initialValue });
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
  var dn, Ga = function(n) {
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
  function yr(n, r) {
    if (r) {
      var l = n.firstChild;
      if (l && l === n.lastChild && l.nodeType === 3) {
        l.nodeValue = r;
        return;
      }
    }
    n.textContent = r;
  }
  var ne = {
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
  Object.keys(ne).forEach(function(n) {
    Ue.forEach(function(r) {
      r = r + n.charAt(0).toUpperCase() + n.substring(1), ne[r] = ne[n];
    });
  });
  function rt(n, r, l) {
    return r == null || typeof r == "boolean" || r === "" ? "" : l || typeof r != "number" || r === 0 || ne.hasOwnProperty(n) && ne[n] ? ("" + r).trim() : r + "px";
  }
  function bt(n, r) {
    n = n.style;
    for (var l in r) if (r.hasOwnProperty(l)) {
      var o = l.indexOf("--") === 0, c = rt(l, r[l], o);
      l === "float" && (l = "cssFloat"), o ? n.setProperty(l, c) : n[l] = c;
    }
  }
  var jt = fe({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function Fn(n, r) {
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
  var kr = null;
  function Bt(n) {
    return n = n.target || n.srcElement || window, n.correspondingUseElement && (n = n.correspondingUseElement), n.nodeType === 3 ? n.parentNode : n;
  }
  var Wr = null, Ht = null, Pt = null;
  function su(n) {
    if (n = $o(n)) {
      if (typeof Wr != "function") throw Error(y(280));
      var r = n.stateNode;
      r && (r = He(r), Wr(n.stateNode, n.type, r));
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
  if (pe) try {
    var qa = {};
    Object.defineProperty(qa, "passive", { get: function() {
      du = !0;
    } }), window.addEventListener("test", qa, qa), window.removeEventListener("test", qa, qa);
  } catch {
    du = !1;
  }
  function di(n, r, l, o, c, d, m, C, w) {
    var F = Array.prototype.slice.call(arguments, 3);
    try {
      r.apply(l, F);
    } catch (W) {
      this.onError(W);
    }
  }
  var Gr = !1, Fa = null, ji = !1, Cl = null, R = { onError: function(n) {
    Gr = !0, Fa = n;
  } };
  function G(n, r, l, o, c, d, m, C, w) {
    Gr = !1, Fa = null, di.apply(R, arguments);
  }
  function ae(n, r, l, o, c, d, m, C, w) {
    if (G.apply(this, arguments), Gr) {
      if (Gr) {
        var F = Fa;
        Gr = !1, Fa = null;
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
        for (var m = !1, C = c.child; C; ) {
          if (C === l) {
            m = !0, l = c, o = d;
            break;
          }
          if (C === o) {
            m = !0, o = c, l = d;
            break;
          }
          C = C.sibling;
        }
        if (!m) {
          for (C = d.child; C; ) {
            if (C === l) {
              m = !0, l = d, o = c;
              break;
            }
            if (C === o) {
              m = !0, o = d, l = c;
              break;
            }
            C = C.sibling;
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
    return n = $e(n), n !== null ? Hn(n) : null;
  }
  function Hn(n) {
    if (n.tag === 5 || n.tag === 6) return n;
    for (n = n.child; n !== null; ) {
      var r = Hn(n);
      if (r !== null) return r;
      n = n.sibling;
    }
    return null;
  }
  var It = T.unstable_scheduleCallback, tn = T.unstable_cancelCallback, Or = T.unstable_shouldYield, Bi = T.unstable_requestPaint, kt = T.unstable_now, or = T.unstable_getCurrentPriorityLevel, qr = T.unstable_ImmediatePriority, lt = T.unstable_UserBlockingPriority, Xa = T.unstable_NormalPriority, qp = T.unstable_LowPriority, Nf = T.unstable_IdlePriority, To = null, Ha = null;
  function Xp(n) {
    if (Ha && typeof Ha.onCommitFiberRoot == "function") try {
      Ha.onCommitFiberRoot(To, n, void 0, (n.current.flags & 128) === 128);
    } catch {
    }
  }
  var da = Math.clz32 ? Math.clz32 : fy, Kp = Math.log, Zp = Math.LN2;
  function fy(n) {
    return n >>>= 0, n === 0 ? 32 : 31 - (Kp(n) / Zp | 0) | 0;
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
      var C = m & ~c;
      C !== 0 ? o = Tl(C) : (d &= m, d !== 0 && (o = Tl(d)));
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
      var m = 31 - da(d), C = 1 << m, w = c[m];
      w === -1 ? (!(C & l) || C & o) && (c[m] = Uf(C, r)) : w <= r && (n.expiredLanes |= C), d &= ~C;
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
  var Jp, Fs, Nt, ev, Hf, et = !1, xo = [], Sn = null, pa = null, va = null, wo = /* @__PURE__ */ new Map(), bn = /* @__PURE__ */ new Map(), zt = [], py = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
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
        bn.delete(r.pointerId);
    }
  }
  function sr(n, r, l, o, c, d) {
    return n === null || n.nativeEvent !== d ? (n = { blockedOn: r, domEventName: l, eventSystemFlags: o, nativeEvent: d, targetContainers: [c] }, r !== null && (r = $o(r), r !== null && Fs(r)), n) : (n.eventSystemFlags |= o, r = n.targetContainers, c !== null && r.indexOf(c) === -1 && r.push(c), n);
  }
  function Pi(n, r, l, o, c) {
    switch (r) {
      case "focusin":
        return Sn = sr(Sn, n, r, l, o, c), !0;
      case "dragenter":
        return pa = sr(pa, n, r, l, o, c), !0;
      case "mouseover":
        return va = sr(va, n, r, l, o, c), !0;
      case "pointerover":
        var d = c.pointerId;
        return wo.set(d, sr(wo.get(d) || null, n, r, l, o, c)), !0;
      case "gotpointercapture":
        return d = c.pointerId, bn.set(d, sr(bn.get(d) || null, n, r, l, o, c)), !0;
    }
    return !1;
  }
  function tv(n) {
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
        kr = o, l.target.dispatchEvent(o), kr = null;
      } else return r = $o(l), r !== null && Fs(r), n.blockedOn = l, !1;
      r.shift();
    }
    return !0;
  }
  function Vf(n, r, l) {
    vu(n) && l.delete(r);
  }
  function nv() {
    et = !1, Sn !== null && vu(Sn) && (Sn = null), pa !== null && vu(pa) && (pa = null), va !== null && vu(va) && (va = null), wo.forEach(Vf), bn.forEach(Vf);
  }
  function bo(n, r) {
    n.blockedOn === r && (n.blockedOn = null, et || (et = !0, T.unstable_scheduleCallback(T.unstable_NormalPriority, nv)));
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
    for (Sn !== null && bo(Sn, n), pa !== null && bo(pa, n), va !== null && bo(va, n), wo.forEach(r), bn.forEach(r), l = 0; l < zt.length; l++) o = zt[l], o.blockedOn === n && (o.blockedOn = null);
    for (; 0 < zt.length && (l = zt[0], l.blockedOn === null); ) tv(l), l.blockedOn === null && zt.shift();
  }
  var hu = ot.ReactCurrentBatchConfig, xl = !0;
  function rv(n, r, l, o) {
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
          if (d !== null && Jp(d), d = js(n, r, l, o), d === null && Zs(n, r, o, _o, l), d === c) break;
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
        switch (or()) {
          case qr:
            return 1;
          case lt:
            return 4;
          case Xa:
          case qp:
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
  function av() {
    return !1;
  }
  function Xr(n) {
    function r(l, o, c, d, m) {
      this._reactName = l, this._targetInst = c, this.type = o, this.nativeEvent = d, this.target = m, this.currentTarget = null;
      for (var C in n) n.hasOwnProperty(C) && (l = n[C], this[C] = l ? l(d) : d[C]);
      return this.isDefaultPrevented = (d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1) ? Lo : av, this.isPropagationStopped = av, this;
    }
    return fe(r.prototype, { preventDefault: function() {
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
  }, defaultPrevented: 0, isTrusted: 0 }, Bs = Xr($i), yu = fe({}, $i, { view: 0, detail: 0 }), iv = Xr(yu), Ps, Pf, Mo, Vn = fe({}, yu, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Qf, button: 0, buttons: 0, relatedTarget: function(n) {
    return n.relatedTarget === void 0 ? n.fromElement === n.srcElement ? n.toElement : n.fromElement : n.relatedTarget;
  }, movementX: function(n) {
    return "movementX" in n ? n.movementX : (n !== Mo && (Mo && n.type === "mousemove" ? (Ps = n.screenX - Mo.screenX, Pf = n.screenY - Mo.screenY) : Pf = Ps = 0, Mo = n), Ps);
  }, movementY: function(n) {
    return "movementY" in n ? n.movementY : Pf;
  } }), $s = Xr(Vn), lv = fe({}, Vn, { dataTransfer: 0 }), uv = Xr(lv), vy = fe({}, yu, { relatedTarget: 0 }), Yi = Xr(vy), $f = fe({}, $i, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), ov = Xr($f), hy = fe({}, $i, { clipboardData: function(n) {
    return "clipboardData" in n ? n.clipboardData : window.clipboardData;
  } }), my = Xr(hy), yy = fe({}, $i, { data: 0 }), Yf = Xr(yy), If = {
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
  }, sv = {
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
  }, cv = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function fv(n) {
    var r = this.nativeEvent;
    return r.getModifierState ? r.getModifierState(n) : (n = cv[n]) ? !!r[n] : !1;
  }
  function Qf() {
    return fv;
  }
  var vi = fe({}, yu, { key: function(n) {
    if (n.key) {
      var r = If[n.key] || n.key;
      if (r !== "Unidentified") return r;
    }
    return n.type === "keypress" ? (n = mu(n), n === 13 ? "Enter" : String.fromCharCode(n)) : n.type === "keydown" || n.type === "keyup" ? sv[n.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Qf, charCode: function(n) {
    return n.type === "keypress" ? mu(n) : 0;
  }, keyCode: function(n) {
    return n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
  }, which: function(n) {
    return n.type === "keypress" ? mu(n) : n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
  } }), gy = Xr(vi), Wf = fe({}, Vn, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Ys = Xr(Wf), Gf = fe({}, yu, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Qf }), Sy = Xr(Gf), Is = fe({}, $i, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), dv = Xr(Is), Lr = fe({}, Vn, {
    deltaX: function(n) {
      return "deltaX" in n ? n.deltaX : "wheelDeltaX" in n ? -n.wheelDeltaX : 0;
    },
    deltaY: function(n) {
      return "deltaY" in n ? n.deltaY : "wheelDeltaY" in n ? -n.wheelDeltaY : "wheelDelta" in n ? -n.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), hi = Xr(Lr), En = [9, 13, 27, 32], Ba = pe && "CompositionEvent" in window, wl = null;
  pe && "documentMode" in document && (wl = document.documentMode);
  var Qs = pe && "TextEvent" in window && !wl, pv = pe && (!Ba || wl && 8 < wl && 11 >= wl), gu = " ", vv = !1;
  function hv(n, r) {
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
        return r.which !== 32 ? null : (vv = !0, gu);
      case "textInput":
        return n = r.data, n === gu && vv ? null : n;
      default:
        return null;
    }
  }
  function Cy(n, r) {
    if (Su) return n === "compositionend" || !Ba && hv(n, r) ? (n = Bf(), Oo = ko = pi = null, Su = !1, n) : null;
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
        return pv && r.locale !== "ko" ? null : r.data;
      default:
        return null;
    }
  }
  var mv = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function yv(n) {
    var r = n && n.nodeName && n.nodeName.toLowerCase();
    return r === "input" ? !!mv[n.type] : r === "textarea";
  }
  function gv(n, r, l, o) {
    gl(o), r = jo(r, "onChange"), 0 < r.length && (l = new Bs("onChange", "change", null, l, o), n.push({ event: l, listeners: r }));
  }
  var No = null, Eu = null;
  function Cu(n) {
    Ks(n, 0);
  }
  function Tu(n) {
    var r = xu(n);
    if (_r(r)) return n;
  }
  function Sv(n, r) {
    if (n === "change") return r;
  }
  var qf = !1;
  if (pe) {
    var Xf;
    if (pe) {
      var Kf = "oninput" in document;
      if (!Kf) {
        var Ev = document.createElement("div");
        Ev.setAttribute("oninput", "return;"), Kf = typeof Ev.oninput == "function";
      }
      Xf = Kf;
    } else Xf = !1;
    qf = Xf && (!document.documentMode || 9 < document.documentMode);
  }
  function Cv() {
    No && (No.detachEvent("onpropertychange", Tv), Eu = No = null);
  }
  function Tv(n) {
    if (n.propertyName === "value" && Tu(Eu)) {
      var r = [];
      gv(r, Eu, n, Bt(n)), fu(Cu, r);
    }
  }
  function Ty(n, r, l) {
    n === "focusin" ? (Cv(), No = r, Eu = l, No.attachEvent("onpropertychange", Tv)) : n === "focusout" && Cv();
  }
  function Ry(n) {
    if (n === "selectionchange" || n === "keyup" || n === "keydown") return Tu(Eu);
  }
  function xy(n, r) {
    if (n === "click") return Tu(r);
  }
  function Rv(n, r) {
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
      if (!se.call(r, c) || !ha(n[c], r[c])) return !1;
    }
    return !0;
  }
  function xv(n) {
    for (; n && n.firstChild; ) n = n.firstChild;
    return n;
  }
  function wv(n, r) {
    var l = xv(n);
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
      l = xv(l);
    }
  }
  function bv(n, r) {
    return n && r ? n === r ? !0 : n && n.nodeType === 3 ? !1 : r && r.nodeType === 3 ? bv(n, r.parentNode) : "contains" in n ? n.contains(r) : n.compareDocumentPosition ? !!(n.compareDocumentPosition(r) & 16) : !1 : !1;
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
    if (r !== l && l && l.ownerDocument && bv(l.ownerDocument.documentElement, l)) {
      if (o !== null && mi(l)) {
        if (r = o.start, n = o.end, n === void 0 && (n = r), "selectionStart" in l) l.selectionStart = r, l.selectionEnd = Math.min(n, l.value.length);
        else if (n = (r = l.ownerDocument || document) && r.defaultView || window, n.getSelection) {
          n = n.getSelection();
          var c = l.textContent.length, d = Math.min(o.start, c);
          o = o.end === void 0 ? d : Math.min(o.end, c), !n.extend && d > o && (c = o, o = d, d = c), c = wv(l, d);
          var m = wv(
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
  var Dv = pe && "documentMode" in document && 11 >= document.documentMode, Pa = null, Zf = null, zo = null, Jf = !1;
  function _v(n, r, l) {
    var o = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    Jf || Pa == null || Pa !== fn(o) || (o = Pa, "selectionStart" in o && mi(o) ? o = { start: o.selectionStart, end: o.selectionEnd } : (o = (o.ownerDocument && o.ownerDocument.defaultView || window).getSelection(), o = { anchorNode: o.anchorNode, anchorOffset: o.anchorOffset, focusNode: o.focusNode, focusOffset: o.focusOffset }), zo && Uo(zo, o) || (zo = o, o = jo(Zf, "onSelect"), 0 < o.length && (r = new Bs("onSelect", "select", null, r, l), n.push({ event: r, listeners: o }), r.target = Pa)));
  }
  function Xs(n, r) {
    var l = {};
    return l[n.toLowerCase()] = r.toLowerCase(), l["Webkit" + n] = "webkit" + r, l["Moz" + n] = "moz" + r, l;
  }
  var bl = { animationend: Xs("Animation", "AnimationEnd"), animationiteration: Xs("Animation", "AnimationIteration"), animationstart: Xs("Animation", "AnimationStart"), transitionend: Xs("Transition", "TransitionEnd") }, ed = {}, td = {};
  pe && (td = document.createElement("div").style, "AnimationEvent" in window || (delete bl.animationend.animation, delete bl.animationiteration.animation, delete bl.animationstart.animation), "TransitionEvent" in window || delete bl.transitionend.transition);
  function jn(n) {
    if (ed[n]) return ed[n];
    if (!bl[n]) return n;
    var r = bl[n], l;
    for (l in r) if (r.hasOwnProperty(l) && l in td) return ed[n] = r[l];
    return n;
  }
  var nd = jn("animationend"), kv = jn("animationiteration"), Ov = jn("animationstart"), Lv = jn("transitionend"), Mv = /* @__PURE__ */ new Map(), Nv = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function yi(n, r) {
    Mv.set(n, r), z(r, [n]);
  }
  for (var Ao = 0; Ao < Nv.length; Ao++) {
    var Dl = Nv[Ao], by = Dl.toLowerCase(), Fo = Dl[0].toUpperCase() + Dl.slice(1);
    yi(by, "on" + Fo);
  }
  yi(nd, "onAnimationEnd"), yi(kv, "onAnimationIteration"), yi(Ov, "onAnimationStart"), yi("dblclick", "onDoubleClick"), yi("focusin", "onFocus"), yi("focusout", "onBlur"), yi(Lv, "onTransitionEnd"), S("onMouseEnter", ["mouseout", "mouseover"]), S("onMouseLeave", ["mouseout", "mouseover"]), S("onPointerEnter", ["pointerout", "pointerover"]), S("onPointerLeave", ["pointerout", "pointerover"]), z("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), z("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), z("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), z("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), z("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), z("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var Ho = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Dy = new Set("cancel close invalid load scroll toggle".split(" ").concat(Ho));
  function Uv(n, r, l) {
    var o = n.type || "unknown-event";
    n.currentTarget = l, ae(o, r, void 0, n), n.currentTarget = null;
  }
  function Ks(n, r) {
    r = (r & 4) !== 0;
    for (var l = 0; l < n.length; l++) {
      var o = n[l], c = o.event;
      o = o.listeners;
      e: {
        var d = void 0;
        if (r) for (var m = o.length - 1; 0 <= m; m--) {
          var C = o[m], w = C.instance, F = C.currentTarget;
          if (C = C.listener, w !== d && c.isPropagationStopped()) break e;
          Uv(c, C, F), d = w;
        }
        else for (m = 0; m < o.length; m++) {
          if (C = o[m], w = C.instance, F = C.currentTarget, C = C.listener, w !== d && c.isPropagationStopped()) break e;
          Uv(c, C, F), d = w;
        }
      }
    }
    if (ji) throw n = Cl, ji = !1, Cl = null, n;
  }
  function Vt(n, r) {
    var l = r[sd];
    l === void 0 && (l = r[sd] = /* @__PURE__ */ new Set());
    var o = n + "__bubble";
    l.has(o) || (zv(r, n, 2, !1), l.add(o));
  }
  function Ii(n, r, l) {
    var o = 0;
    r && (o |= 4), zv(l, n, o, r);
  }
  var gi = "_reactListening" + Math.random().toString(36).slice(2);
  function Ru(n) {
    if (!n[gi]) {
      n[gi] = !0, A.forEach(function(l) {
        l !== "selectionchange" && (Dy.has(l) || Ii(l, !1, n), Ii(l, !0, n));
      });
      var r = n.nodeType === 9 ? n : n.ownerDocument;
      r === null || r[gi] || (r[gi] = !0, Ii("selectionchange", !1, r));
    }
  }
  function zv(n, r, l, o) {
    switch (jf(r)) {
      case 1:
        var c = rv;
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
        var C = o.stateNode.containerInfo;
        if (C === c || C.nodeType === 8 && C.parentNode === c) break;
        if (m === 4) for (m = o.return; m !== null; ) {
          var w = m.tag;
          if ((w === 3 || w === 4) && (w = m.stateNode.containerInfo, w === c || w.nodeType === 8 && w.parentNode === c)) return;
          m = m.return;
        }
        for (; C !== null; ) {
          if (m = ma(C), m === null) return;
          if (w = m.tag, w === 5 || w === 6) {
            o = d = m;
            continue e;
          }
          C = C.parentNode;
        }
      }
      o = o.return;
    }
    fu(function() {
      var F = d, W = Bt(l), X = [];
      e: {
        var Q = Mv.get(n);
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
              he = uv;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              he = Sy;
              break;
            case nd:
            case kv:
            case Ov:
              he = ov;
              break;
            case Lv:
              he = dv;
              break;
            case "scroll":
              he = iv;
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
          var we = (r & 4) !== 0, mn = !we && n === "scroll", k = we ? Q !== null ? Q + "Capture" : null : Q;
          we = [];
          for (var D = F, N; D !== null; ) {
            N = D;
            var J = N.stateNode;
            if (N.tag === 5 && J !== null && (N = J, k !== null && (J = El(D, k), J != null && we.push(Vo(D, J, N)))), mn) break;
            D = D.return;
          }
          0 < we.length && (Q = new he(Q, Ce, null, l, W), X.push({ event: Q, listeners: we }));
        }
      }
      if (!(r & 7)) {
        e: {
          if (Q = n === "mouseover" || n === "pointerover", he = n === "mouseout" || n === "pointerout", Q && l !== kr && (Ce = l.relatedTarget || l.fromElement) && (ma(Ce) || Ce[Si])) break e;
          if ((he || Q) && (Q = W.window === W ? W : (Q = W.ownerDocument) ? Q.defaultView || Q.parentWindow : window, he ? (Ce = l.relatedTarget || l.toElement, he = F, Ce = Ce ? ma(Ce) : null, Ce !== null && (mn = ze(Ce), Ce !== mn || Ce.tag !== 5 && Ce.tag !== 6) && (Ce = null)) : (he = null, Ce = F), he !== Ce)) {
            if (we = $s, J = "onMouseLeave", k = "onMouseEnter", D = "mouse", (n === "pointerout" || n === "pointerover") && (we = Ys, J = "onPointerLeave", k = "onPointerEnter", D = "pointer"), mn = he == null ? Q : xu(he), N = Ce == null ? Q : xu(Ce), Q = new we(J, D + "leave", he, l, W), Q.target = mn, Q.relatedTarget = N, J = null, ma(W) === F && (we = new we(k, D + "enter", Ce, l, W), we.target = N, we.relatedTarget = mn, J = we), mn = J, he && Ce) t: {
              for (we = he, k = Ce, D = 0, N = we; N; N = _l(N)) D++;
              for (N = 0, J = k; J; J = _l(J)) N++;
              for (; 0 < D - N; ) we = _l(we), D--;
              for (; 0 < N - D; ) k = _l(k), N--;
              for (; D--; ) {
                if (we === k || k !== null && we === k.alternate) break t;
                we = _l(we), k = _l(k);
              }
              we = null;
            }
            else we = null;
            he !== null && rd(X, Q, he, we, !1), Ce !== null && mn !== null && rd(X, mn, Ce, we, !0);
          }
        }
        e: {
          if (Q = F ? xu(F) : window, he = Q.nodeName && Q.nodeName.toLowerCase(), he === "select" || he === "input" && Q.type === "file") var _e = Sv;
          else if (yv(Q)) if (qf) _e = Rv;
          else {
            _e = Ry;
            var Be = Ty;
          }
          else (he = Q.nodeName) && he.toLowerCase() === "input" && (Q.type === "checkbox" || Q.type === "radio") && (_e = xy);
          if (_e && (_e = _e(n, F))) {
            gv(X, _e, l, W);
            break e;
          }
          Be && Be(n, Q, F), n === "focusout" && (Be = Q._wrapperState) && Be.controlled && Q.type === "number" && M(Q, "number", Q.value);
        }
        switch (Be = F ? xu(F) : window, n) {
          case "focusin":
            (yv(Be) || Be.contentEditable === "true") && (Pa = Be, Zf = F, zo = null);
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
            Jf = !1, _v(X, l, W);
            break;
          case "selectionchange":
            if (Dv) break;
          case "keydown":
          case "keyup":
            _v(X, l, W);
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
        else Su ? hv(n, l) && (Pe = "onCompositionEnd") : n === "keydown" && l.keyCode === 229 && (Pe = "onCompositionStart");
        Pe && (pv && l.locale !== "ko" && (Su || Pe !== "onCompositionStart" ? Pe === "onCompositionEnd" && Su && (Te = Bf()) : (pi = W, ko = "value" in pi ? pi.value : pi.textContent, Su = !0)), Be = jo(F, Pe), 0 < Be.length && (Pe = new Yf(Pe, n, null, l, W), X.push({ event: Pe, listeners: Be }), Te ? Pe.data = Te : (Te = Ws(l), Te !== null && (Pe.data = Te)))), (Te = Qs ? Ey(n, l) : Cy(n, l)) && (F = jo(F, "onBeforeInput"), 0 < F.length && (W = new Yf("onBeforeInput", "beforeinput", null, l, W), X.push({ event: W, listeners: F }), W.data = Te));
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
      var C = l, w = C.alternate, F = C.stateNode;
      if (w !== null && w === o) break;
      C.tag === 5 && F !== null && (C = F, c ? (w = El(l, d), w != null && m.unshift(Vo(l, w, C))) : c || (w = El(l, d), w != null && m.push(Vo(l, w, C)))), l = l.return;
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
  var Ol = typeof setTimeout == "function" ? setTimeout : void 0, Av = typeof clearTimeout == "function" ? clearTimeout : void 0, ud = typeof Promise == "function" ? Promise : void 0, od = typeof queueMicrotask == "function" ? queueMicrotask : typeof ud < "u" ? function(n) {
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
  var Wi = Math.random().toString(36).slice(2), Ka = "__reactFiber$" + Wi, Ll = "__reactProps$" + Wi, Si = "__reactContainer$" + Wi, sd = "__reactEvents$" + Wi, Oy = "__reactListeners$" + Wi, cd = "__reactHandles$" + Wi;
  function ma(n) {
    var r = n[Ka];
    if (r) return r;
    for (var l = n.parentNode; l; ) {
      if (r = l[Si] || l[Ka]) {
        if (l = r.alternate, r.child !== null || l !== null && l.child !== null) for (n = Po(n); n !== null; ) {
          if (l = n[Ka]) return l;
          n = Po(n);
        }
        return r;
      }
      n = l, l = n.parentNode;
    }
    return null;
  }
  function $o(n) {
    return n = n[Ka] || n[Si], !n || n.tag !== 5 && n.tag !== 6 && n.tag !== 13 && n.tag !== 3 ? null : n;
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
  var Za = {}, Qe = nt(Za), un = nt(!1), Mr = Za;
  function ya(n, r) {
    var l = n.type.contextTypes;
    if (!l) return Za;
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
    if (Qe.current !== Za) throw Error(y(168));
    Ot(Qe, r), Ot(un, l);
  }
  function Yo(n, r, l) {
    var o = n.stateNode;
    if (r = r.childContextTypes, typeof o.getChildContext != "function") return l;
    o = o.getChildContext();
    for (var c in o) if (!(c in r)) throw Error(y(108, mr(n) || "Unknown", c));
    return fe({}, l, o);
  }
  function tc(n) {
    return n = (n = n.stateNode) && n.__reactInternalMemoizedMergedChildContext || Za, Mr = Qe.current, Ot(Qe, n), Ot(un, un.current), !0;
  }
  function Fv(n, r, l) {
    var o = n.stateNode;
    if (!o) throw Error(y(169));
    l ? (n = Yo(n, r, Mr), o.__reactInternalMemoizedMergedChildContext = n, Dt(un), Dt(Qe), Ot(Qe, n)) : Dt(un), Ot(un, l);
  }
  var Kr = null, Bn = !1, Io = !1;
  function fd(n) {
    Kr === null ? Kr = [n] : Kr.push(n);
  }
  function dd(n) {
    Bn = !0, fd(n);
  }
  function Nr() {
    if (!Io && Kr !== null) {
      Io = !0;
      var n = 0, r = Mt;
      try {
        var l = Kr;
        for (Mt = 1; n < l.length; n++) {
          var o = l[n];
          do
            o = o(!0);
          while (o !== null);
        }
        Kr = null, Bn = !1;
      } catch (c) {
        throw Kr !== null && (Kr = Kr.slice(n + 1)), It(qr, Nr), c;
      } finally {
        Mt = r, Io = !1;
      }
    }
    return null;
  }
  var Xi = [], Ur = 0, Ml = null, wu = 0, zr = [], cr = 0, Sa = null, Xn = 1, Ei = "";
  function Zr(n, r) {
    Xi[Ur++] = wu, Xi[Ur++] = Ml, Ml = n, wu = r;
  }
  function pd(n, r, l) {
    zr[cr++] = Xn, zr[cr++] = Ei, zr[cr++] = Sa, Sa = n;
    var o = Xn;
    n = Ei;
    var c = 32 - da(o) - 1;
    o &= ~(1 << c), l += 1;
    var d = 32 - da(r) + c;
    if (30 < d) {
      var m = c - c % 5;
      d = (o & (1 << m) - 1).toString(32), o >>= m, c -= m, Xn = 1 << 32 - da(r) + c | l << c | o, Ei = d + n;
    } else Xn = 1 << d | l << c | o, Ei = n;
  }
  function nc(n) {
    n.return !== null && (Zr(n, 1), pd(n, 1, 0));
  }
  function vd(n) {
    for (; n === Ml; ) Ml = Xi[--Ur], Xi[Ur] = null, wu = Xi[--Ur], Xi[Ur] = null;
    for (; n === Sa; ) Sa = zr[--cr], zr[cr] = null, Ei = zr[--cr], zr[cr] = null, Xn = zr[--cr], zr[cr] = null;
  }
  var Jr = null, Ar = null, Wt = !1, Ea = null;
  function hd(n, r) {
    var l = _a(5, null, null, 0);
    l.elementType = "DELETED", l.stateNode = r, l.return = n, r = n.deletions, r === null ? (n.deletions = [l], n.flags |= 16) : r.push(l);
  }
  function Hv(n, r) {
    switch (n.tag) {
      case 5:
        var l = n.type;
        return r = r.nodeType !== 1 || l.toLowerCase() !== r.nodeName.toLowerCase() ? null : r, r !== null ? (n.stateNode = r, Jr = n, Ar = $a(r.firstChild), !0) : !1;
      case 6:
        return r = n.pendingProps === "" || r.nodeType !== 3 ? null : r, r !== null ? (n.stateNode = r, Jr = n, Ar = null, !0) : !1;
      case 13:
        return r = r.nodeType !== 8 ? null : r, r !== null ? (l = Sa !== null ? { id: Xn, overflow: Ei } : null, n.memoizedState = { dehydrated: r, treeContext: l, retryLane: 1073741824 }, l = _a(18, null, null, 0), l.stateNode = r, l.return = n, n.child = l, Jr = n, Ar = null, !0) : !1;
      default:
        return !1;
    }
  }
  function rc(n) {
    return (n.mode & 1) !== 0 && (n.flags & 128) === 0;
  }
  function ac(n) {
    if (Wt) {
      var r = Ar;
      if (r) {
        var l = r;
        if (!Hv(n, r)) {
          if (rc(n)) throw Error(y(418));
          r = $a(l.nextSibling);
          var o = Jr;
          r && Hv(n, r) ? hd(o, l) : (n.flags = n.flags & -4097 | 2, Wt = !1, Jr = n);
        }
      } else {
        if (rc(n)) throw Error(y(418));
        n.flags = n.flags & -4097 | 2, Wt = !1, Jr = n;
      }
    }
  }
  function Vv(n) {
    for (n = n.return; n !== null && n.tag !== 5 && n.tag !== 3 && n.tag !== 13; ) n = n.return;
    Jr = n;
  }
  function ic(n) {
    if (n !== Jr) return !1;
    if (!Wt) return Vv(n), Wt = !0, !1;
    var r;
    if ((r = n.tag !== 3) && !(r = n.tag !== 5) && (r = n.type, r = r !== "head" && r !== "body" && !Bo(n.type, n.memoizedProps)), r && (r = Ar)) {
      if (rc(n)) throw jv(), Error(y(418));
      for (; r; ) hd(n, r), r = $a(r.nextSibling);
    }
    if (Vv(n), n.tag === 13) {
      if (n = n.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(y(317));
      e: {
        for (n = n.nextSibling, r = 0; n; ) {
          if (n.nodeType === 8) {
            var l = n.data;
            if (l === "/$") {
              if (r === 0) {
                Ar = $a(n.nextSibling);
                break e;
              }
              r--;
            } else l !== "$" && l !== "$!" && l !== "$?" || r++;
          }
          n = n.nextSibling;
        }
        Ar = null;
      }
    } else Ar = Jr ? $a(n.stateNode.nextSibling) : null;
    return !0;
  }
  function jv() {
    for (var n = Ar; n; ) n = $a(n.nextSibling);
  }
  function nn() {
    Ar = Jr = null, Wt = !1;
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
          var C = c.refs;
          m === null ? delete C[d] : C[d] = m;
        }, r._stringRef = d, r);
      }
      if (typeof n != "string") throw Error(y(284));
      if (!l._owner) throw Error(y(290, n));
    }
    return n;
  }
  function Ja(n, r) {
    throw n = Object.prototype.toString.call(r), Error(y(31, n === "[object Object]" ? "object with keys {" + Object.keys(r).join(", ") + "}" : n));
  }
  function Bv(n) {
    var r = n._init;
    return r(n._payload);
  }
  function uc(n) {
    function r(k, D) {
      if (n) {
        var N = k.deletions;
        N === null ? (k.deletions = [D], k.flags |= 16) : N.push(D);
      }
    }
    function l(k, D) {
      if (!n) return null;
      for (; D !== null; ) r(k, D), D = D.sibling;
      return null;
    }
    function o(k, D) {
      for (k = /* @__PURE__ */ new Map(); D !== null; ) D.key !== null ? k.set(D.key, D) : k.set(D.index, D), D = D.sibling;
      return k;
    }
    function c(k, D) {
      return k = al(k, D), k.index = 0, k.sibling = null, k;
    }
    function d(k, D, N) {
      return k.index = N, n ? (N = k.alternate, N !== null ? (N = N.index, N < D ? (k.flags |= 2, D) : N) : (k.flags |= 2, D)) : (k.flags |= 1048576, D);
    }
    function m(k) {
      return n && k.alternate === null && (k.flags |= 2), k;
    }
    function C(k, D, N, J) {
      return D === null || D.tag !== 6 ? (D = Gc(N, k.mode, J), D.return = k, D) : (D = c(D, N), D.return = k, D);
    }
    function w(k, D, N, J) {
      var _e = N.type;
      return _e === Xe ? W(k, D, N.props.children, J, N.key) : D !== null && (D.elementType === _e || typeof _e == "object" && _e !== null && _e.$$typeof === st && Bv(_e) === D.type) ? (J = c(D, N.props), J.ref = Nl(k, D, N), J.return = k, J) : (J = Qc(N.type, N.key, N.props, null, k.mode, J), J.ref = Nl(k, D, N), J.return = k, J);
    }
    function F(k, D, N, J) {
      return D === null || D.tag !== 4 || D.stateNode.containerInfo !== N.containerInfo || D.stateNode.implementation !== N.implementation ? (D = ss(N, k.mode, J), D.return = k, D) : (D = c(D, N.children || []), D.return = k, D);
    }
    function W(k, D, N, J, _e) {
      return D === null || D.tag !== 7 ? (D = Gl(N, k.mode, J, _e), D.return = k, D) : (D = c(D, N), D.return = k, D);
    }
    function X(k, D, N) {
      if (typeof D == "string" && D !== "" || typeof D == "number") return D = Gc("" + D, k.mode, N), D.return = k, D;
      if (typeof D == "object" && D !== null) {
        switch (D.$$typeof) {
          case Ne:
            return N = Qc(D.type, D.key, D.props, null, k.mode, N), N.ref = Nl(k, null, D), N.return = k, N;
          case Ct:
            return D = ss(D, k.mode, N), D.return = k, D;
          case st:
            var J = D._init;
            return X(k, J(D._payload), N);
        }
        if (V(D) || ke(D)) return D = Gl(D, k.mode, N, null), D.return = k, D;
        Ja(k, D);
      }
      return null;
    }
    function Q(k, D, N, J) {
      var _e = D !== null ? D.key : null;
      if (typeof N == "string" && N !== "" || typeof N == "number") return _e !== null ? null : C(k, D, "" + N, J);
      if (typeof N == "object" && N !== null) {
        switch (N.$$typeof) {
          case Ne:
            return N.key === _e ? w(k, D, N, J) : null;
          case Ct:
            return N.key === _e ? F(k, D, N, J) : null;
          case st:
            return _e = N._init, Q(
              k,
              D,
              _e(N._payload),
              J
            );
        }
        if (V(N) || ke(N)) return _e !== null ? null : W(k, D, N, J, null);
        Ja(k, N);
      }
      return null;
    }
    function he(k, D, N, J, _e) {
      if (typeof J == "string" && J !== "" || typeof J == "number") return k = k.get(N) || null, C(D, k, "" + J, _e);
      if (typeof J == "object" && J !== null) {
        switch (J.$$typeof) {
          case Ne:
            return k = k.get(J.key === null ? N : J.key) || null, w(D, k, J, _e);
          case Ct:
            return k = k.get(J.key === null ? N : J.key) || null, F(D, k, J, _e);
          case st:
            var Be = J._init;
            return he(k, D, N, Be(J._payload), _e);
        }
        if (V(J) || ke(J)) return k = k.get(N) || null, W(D, k, J, _e, null);
        Ja(D, J);
      }
      return null;
    }
    function Ce(k, D, N, J) {
      for (var _e = null, Be = null, Te = D, Pe = D = 0, Ln = null; Te !== null && Pe < N.length; Pe++) {
        Te.index > Pe ? (Ln = Te, Te = null) : Ln = Te.sibling;
        var Tt = Q(k, Te, N[Pe], J);
        if (Tt === null) {
          Te === null && (Te = Ln);
          break;
        }
        n && Te && Tt.alternate === null && r(k, Te), D = d(Tt, D, Pe), Be === null ? _e = Tt : Be.sibling = Tt, Be = Tt, Te = Ln;
      }
      if (Pe === N.length) return l(k, Te), Wt && Zr(k, Pe), _e;
      if (Te === null) {
        for (; Pe < N.length; Pe++) Te = X(k, N[Pe], J), Te !== null && (D = d(Te, D, Pe), Be === null ? _e = Te : Be.sibling = Te, Be = Te);
        return Wt && Zr(k, Pe), _e;
      }
      for (Te = o(k, Te); Pe < N.length; Pe++) Ln = he(Te, k, Pe, N[Pe], J), Ln !== null && (n && Ln.alternate !== null && Te.delete(Ln.key === null ? Pe : Ln.key), D = d(Ln, D, Pe), Be === null ? _e = Ln : Be.sibling = Ln, Be = Ln);
      return n && Te.forEach(function(Di) {
        return r(k, Di);
      }), Wt && Zr(k, Pe), _e;
    }
    function we(k, D, N, J) {
      var _e = ke(N);
      if (typeof _e != "function") throw Error(y(150));
      if (N = _e.call(N), N == null) throw Error(y(151));
      for (var Be = _e = null, Te = D, Pe = D = 0, Ln = null, Tt = N.next(); Te !== null && !Tt.done; Pe++, Tt = N.next()) {
        Te.index > Pe ? (Ln = Te, Te = null) : Ln = Te.sibling;
        var Di = Q(k, Te, Tt.value, J);
        if (Di === null) {
          Te === null && (Te = Ln);
          break;
        }
        n && Te && Di.alternate === null && r(k, Te), D = d(Di, D, Pe), Be === null ? _e = Di : Be.sibling = Di, Be = Di, Te = Ln;
      }
      if (Tt.done) return l(
        k,
        Te
      ), Wt && Zr(k, Pe), _e;
      if (Te === null) {
        for (; !Tt.done; Pe++, Tt = N.next()) Tt = X(k, Tt.value, J), Tt !== null && (D = d(Tt, D, Pe), Be === null ? _e = Tt : Be.sibling = Tt, Be = Tt);
        return Wt && Zr(k, Pe), _e;
      }
      for (Te = o(k, Te); !Tt.done; Pe++, Tt = N.next()) Tt = he(Te, k, Pe, Tt.value, J), Tt !== null && (n && Tt.alternate !== null && Te.delete(Tt.key === null ? Pe : Tt.key), D = d(Tt, D, Pe), Be === null ? _e = Tt : Be.sibling = Tt, Be = Tt);
      return n && Te.forEach(function(Gy) {
        return r(k, Gy);
      }), Wt && Zr(k, Pe), _e;
    }
    function mn(k, D, N, J) {
      if (typeof N == "object" && N !== null && N.type === Xe && N.key === null && (N = N.props.children), typeof N == "object" && N !== null) {
        switch (N.$$typeof) {
          case Ne:
            e: {
              for (var _e = N.key, Be = D; Be !== null; ) {
                if (Be.key === _e) {
                  if (_e = N.type, _e === Xe) {
                    if (Be.tag === 7) {
                      l(k, Be.sibling), D = c(Be, N.props.children), D.return = k, k = D;
                      break e;
                    }
                  } else if (Be.elementType === _e || typeof _e == "object" && _e !== null && _e.$$typeof === st && Bv(_e) === Be.type) {
                    l(k, Be.sibling), D = c(Be, N.props), D.ref = Nl(k, Be, N), D.return = k, k = D;
                    break e;
                  }
                  l(k, Be);
                  break;
                } else r(k, Be);
                Be = Be.sibling;
              }
              N.type === Xe ? (D = Gl(N.props.children, k.mode, J, N.key), D.return = k, k = D) : (J = Qc(N.type, N.key, N.props, null, k.mode, J), J.ref = Nl(k, D, N), J.return = k, k = J);
            }
            return m(k);
          case Ct:
            e: {
              for (Be = N.key; D !== null; ) {
                if (D.key === Be) if (D.tag === 4 && D.stateNode.containerInfo === N.containerInfo && D.stateNode.implementation === N.implementation) {
                  l(k, D.sibling), D = c(D, N.children || []), D.return = k, k = D;
                  break e;
                } else {
                  l(k, D);
                  break;
                }
                else r(k, D);
                D = D.sibling;
              }
              D = ss(N, k.mode, J), D.return = k, k = D;
            }
            return m(k);
          case st:
            return Be = N._init, mn(k, D, Be(N._payload), J);
        }
        if (V(N)) return Ce(k, D, N, J);
        if (ke(N)) return we(k, D, N, J);
        Ja(k, N);
      }
      return typeof N == "string" && N !== "" || typeof N == "number" ? (N = "" + N, D !== null && D.tag === 6 ? (l(k, D.sibling), D = c(D, N), D.return = k, k = D) : (l(k, D), D = Gc(N, k.mode, J), D.return = k, k = D), m(k)) : l(k, D);
    }
    return mn;
  }
  var bu = uc(!0), Pv = uc(!1), Ci = nt(null), Dn = null, ie = null, Ca = null;
  function ea() {
    Ca = ie = Dn = null;
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
    Dn = n, Ca = ie = null, n = n.dependencies, n !== null && n.firstContext !== null && (n.lanes & r && (Vr = !0), n.firstContext = null);
  }
  function Ta(n) {
    var r = n._currentValue;
    if (Ca !== n) if (n = { context: n, memoizedValue: r, next: null }, ie === null) {
      if (Dn === null) throw Error(y(308));
      ie = n, Dn.dependencies = { lanes: 0, firstContext: n };
    } else ie = ie.next = n;
    return r;
  }
  var Ul = null;
  function Cn(n) {
    Ul === null ? Ul = [n] : Ul.push(n);
  }
  function $v(n, r, l, o) {
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
  function Fr(n, r) {
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
  function Yv(n, r) {
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
    var d = c.firstBaseUpdate, m = c.lastBaseUpdate, C = c.shared.pending;
    if (C !== null) {
      c.shared.pending = null;
      var w = C, F = w.next;
      w.next = null, m === null ? d = F : m.next = F, m = w;
      var W = n.alternate;
      W !== null && (W = W.updateQueue, C = W.lastBaseUpdate, C !== m && (C === null ? W.firstBaseUpdate = F : C.next = F, W.lastBaseUpdate = w));
    }
    if (d !== null) {
      var X = c.baseState;
      m = 0, W = F = w = null, C = d;
      do {
        var Q = C.lane, he = C.eventTime;
        if ((o & Q) === Q) {
          W !== null && (W = W.next = {
            eventTime: he,
            lane: 0,
            tag: C.tag,
            payload: C.payload,
            callback: C.callback,
            next: null
          });
          e: {
            var Ce = n, we = C;
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
                X = fe({}, X, Q);
                break e;
              case 2:
                Ki = !0;
            }
          }
          C.callback !== null && C.lane !== 0 && (n.flags |= 64, Q = c.effects, Q === null ? c.effects = [C] : Q.push(C));
        } else he = { eventTime: he, lane: Q, tag: C.tag, payload: C.payload, callback: C.callback, next: null }, W === null ? (F = W = he, w = X) : W = W.next = he, m |= Q;
        if (C = C.next, C === null) {
          if (C = c.shared.pending, C === null) break;
          Q = C, C = Q.next, Q.next = null, c.lastBaseUpdate = Q, c.shared.pending = null;
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
  function Iv(n, r, l) {
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
  function Qv(n) {
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
  var pc = ot.ReactCurrentDispatcher, Go = ot.ReactCurrentBatchConfig, De = 0, Oe = null, We = null, ut = null, ta = !1, Lu = !1, qo = 0, Ly = 0;
  function fr() {
    throw Error(y(321));
  }
  function Xo(n, r) {
    if (r === null) return !1;
    for (var l = 0; l < r.length && l < n.length; l++) if (!ha(n[l], r[l])) return !1;
    return !0;
  }
  function I(n, r, l, o, c, d) {
    if (De = d, Oe = r, r.memoizedState = null, r.updateQueue = null, r.lanes = 0, pc.current = n === null || n.memoizedState === null ? My : $t, n = l(o, c), Lu) {
      d = 0;
      do {
        if (Lu = !1, qo = 0, 25 <= d) throw Error(y(301));
        d += 1, ut = We = null, r.updateQueue = null, pc.current = _c, n = l(o, c);
      } while (Lu);
    }
    if (pc.current = dr, r = We !== null && We.next !== null, De = 0, ut = We = Oe = null, ta = !1, r) throw Error(y(300));
    return n;
  }
  function Tn() {
    var n = qo !== 0;
    return qo = 0, n;
  }
  function Ae() {
    var n = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return ut === null ? Oe.memoizedState = ut = n : ut = ut.next = n, ut;
  }
  function Kn() {
    if (We === null) {
      var n = Oe.alternate;
      n = n !== null ? n.memoizedState : null;
    } else n = We.next;
    var r = ut === null ? Oe.memoizedState : ut.next;
    if (r !== null) ut = r, We = n;
    else {
      if (n === null) throw Error(y(310));
      We = n, n = { memoizedState: We.memoizedState, baseState: We.baseState, baseQueue: We.baseQueue, queue: We.queue, next: null }, ut === null ? Oe.memoizedState = ut = n : ut = ut.next = n;
    }
    return ut;
  }
  function na(n, r) {
    return typeof r == "function" ? r(n) : r;
  }
  function Ri(n) {
    var r = Kn(), l = r.queue;
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
      var C = m = null, w = null, F = d;
      do {
        var W = F.lane;
        if ((De & W) === W) w !== null && (w = w.next = { lane: 0, action: F.action, hasEagerState: F.hasEagerState, eagerState: F.eagerState, next: null }), o = F.hasEagerState ? F.eagerState : n(o, F.action);
        else {
          var X = {
            lane: W,
            action: F.action,
            hasEagerState: F.hasEagerState,
            eagerState: F.eagerState,
            next: null
          };
          w === null ? (C = w = X, m = o) : w = w.next = X, Oe.lanes |= W, Yl |= W;
        }
        F = F.next;
      } while (F !== null && F !== d);
      w === null ? m = o : w.next = C, ha(o, r.memoizedState) || (Vr = !0), r.memoizedState = o, r.baseState = m, r.baseQueue = w, l.lastRenderedState = o;
    }
    if (n = l.interleaved, n !== null) {
      c = n;
      do
        d = c.lane, Oe.lanes |= d, Yl |= d, c = c.next;
      while (c !== n);
    } else c === null && (l.lanes = 0);
    return [r.memoizedState, l.dispatch];
  }
  function Ra(n) {
    var r = Kn(), l = r.queue;
    if (l === null) throw Error(y(311));
    l.lastRenderedReducer = n;
    var o = l.dispatch, c = l.pending, d = r.memoizedState;
    if (c !== null) {
      l.pending = null;
      var m = c = c.next;
      do
        d = n(d, m.action), m = m.next;
      while (m !== c);
      ha(d, r.memoizedState) || (Vr = !0), r.memoizedState = d, r.baseQueue === null && (r.baseState = d), l.lastRenderedState = d;
    }
    return [d, o];
  }
  function Mu() {
  }
  function Al(n, r) {
    var l = Oe, o = Kn(), c = r(), d = !ha(o.memoizedState, c);
    if (d && (o.memoizedState = c, Vr = !0), o = o.queue, Ko(hc.bind(null, l, o, n), [n]), o.getSnapshot !== r || d || ut !== null && ut.memoizedState.tag & 1) {
      if (l.flags |= 2048, Fl(9, vc.bind(null, l, o, c, r), void 0, null), sn === null) throw Error(y(349));
      De & 30 || Nu(l, r, c);
    }
    return c;
  }
  function Nu(n, r, l) {
    n.flags |= 16384, n = { getSnapshot: r, value: l }, r = Oe.updateQueue, r === null ? (r = { lastEffect: null, stores: null }, Oe.updateQueue = r, r.stores = [n]) : (l = r.stores, l === null ? r.stores = [n] : l.push(n));
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
    return typeof n == "function" && (n = n()), r.memoizedState = r.baseState = n, n = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: na, lastRenderedState: n }, r.queue = n, n = n.dispatch = Zo.bind(null, Oe, n), [r.memoizedState, n];
  }
  function Fl(n, r, l, o) {
    return n = { tag: n, create: r, destroy: l, deps: o, next: null }, r = Oe.updateQueue, r === null ? (r = { lastEffect: null, stores: null }, Oe.updateQueue = r, r.lastEffect = n.next = n) : (l = r.lastEffect, l === null ? r.lastEffect = n.next = n : (o = l.next, l.next = n, n.next = o, r.lastEffect = n)), n;
  }
  function Sc() {
    return Kn().memoizedState;
  }
  function Uu(n, r, l, o) {
    var c = Ae();
    Oe.flags |= n, c.memoizedState = Fl(1 | r, l, void 0, o === void 0 ? null : o);
  }
  function zu(n, r, l, o) {
    var c = Kn();
    o = o === void 0 ? null : o;
    var d = void 0;
    if (We !== null) {
      var m = We.memoizedState;
      if (d = m.destroy, o !== null && Xo(o, m.deps)) {
        c.memoizedState = Fl(r, l, d, o);
        return;
      }
    }
    Oe.flags |= n, c.memoizedState = Fl(1 | r, l, d, o);
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
    var l = Kn();
    r = r === void 0 ? null : r;
    var o = l.memoizedState;
    return o !== null && r !== null && Xo(r, o[1]) ? o[0] : (l.memoizedState = [n, r], n);
  }
  function wc(n, r) {
    var l = Kn();
    r = r === void 0 ? null : r;
    var o = l.memoizedState;
    return o !== null && r !== null && Xo(r, o[1]) ? o[0] : (n = n(), l.memoizedState = [n, r], n);
  }
  function bc(n, r, l) {
    return De & 21 ? (ha(l, r) || (l = As(), Oe.lanes |= l, Yl |= l, n.baseState = !0), r) : (n.baseState && (n.baseState = !1, Vr = !0), n.memoizedState = l);
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
    return Kn().memoizedState;
  }
  function Wv(n, r, l) {
    var o = bi(n);
    if (l = { lane: o, action: l, hasEagerState: !1, eagerState: null, next: null }, Rd(n)) Fu(r, l);
    else if (l = $v(n, r, l, o), l !== null) {
      var c = Yn();
      rn(l, n, o, c), Ji(l, r, o);
    }
  }
  function Zo(n, r, l) {
    var o = bi(n), c = { lane: o, action: l, hasEagerState: !1, eagerState: null, next: null };
    if (Rd(n)) Fu(r, c);
    else {
      var d = n.alternate;
      if (n.lanes === 0 && (d === null || d.lanes === 0) && (d = r.lastRenderedReducer, d !== null)) try {
        var m = r.lastRenderedState, C = d(m, l);
        if (c.hasEagerState = !0, c.eagerState = C, ha(C, m)) {
          var w = r.interleaved;
          w === null ? (c.next = c, Cn(r)) : (c.next = w.next, w.next = c), r.interleaved = c;
          return;
        }
      } catch {
      } finally {
      }
      l = $v(n, r, c, o), l !== null && (c = Yn(), rn(l, n, o, c), Ji(l, r, o));
    }
  }
  function Rd(n) {
    var r = n.alternate;
    return n === Oe || r !== null && r === Oe;
  }
  function Fu(n, r) {
    Lu = ta = !0;
    var l = n.pending;
    l === null ? r.next = r : (r.next = l.next, l.next = r), n.pending = r;
  }
  function Ji(n, r, l) {
    if (l & 4194240) {
      var o = r.lanes;
      o &= n.pendingLanes, l |= o, r.lanes = l, Ro(n, l);
    }
  }
  var dr = { readContext: Ta, useCallback: fr, useContext: fr, useEffect: fr, useImperativeHandle: fr, useInsertionEffect: fr, useLayoutEffect: fr, useMemo: fr, useReducer: fr, useRef: fr, useState: fr, useDebugValue: fr, useDeferredValue: fr, useTransition: fr, useMutableSource: fr, useSyncExternalStore: fr, useId: fr, unstable_isNewReconciler: !1 }, My = { readContext: Ta, useCallback: function(n, r) {
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
    return r = l !== void 0 ? l(r) : r, o.memoizedState = o.baseState = r, n = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: n, lastRenderedState: r }, o.queue = n, n = n.dispatch = Wv.bind(null, Oe, n), [o.memoizedState, n];
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
    var o = Oe, c = Ae();
    if (Wt) {
      if (l === void 0) throw Error(y(407));
      l = l();
    } else {
      if (l = r(), sn === null) throw Error(y(349));
      De & 30 || Nu(o, r, l);
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
      var l = Ei, o = Xn;
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
      return Ri(na);
    },
    useDebugValue: Au,
    useDeferredValue: function(n) {
      var r = Kn();
      return bc(r, We.memoizedState, n);
    },
    useTransition: function() {
      var n = Ri(na)[0], r = Kn().memoizedState;
      return [n, r];
    },
    useMutableSource: Mu,
    useSyncExternalStore: Al,
    useId: Dc,
    unstable_isNewReconciler: !1
  }, _c = { readContext: Ta, useCallback: Hl, useContext: Ta, useEffect: Ko, useImperativeHandle: xc, useInsertionEffect: Cc, useLayoutEffect: Tc, useMemo: wc, useReducer: Ra, useRef: Sc, useState: function() {
    return Ra(na);
  }, useDebugValue: Au, useDeferredValue: function(n) {
    var r = Kn();
    return We === null ? r.memoizedState = n : bc(r, We.memoizedState, n);
  }, useTransition: function() {
    var n = Ra(na)[0], r = Kn().memoizedState;
    return [n, r];
  }, useMutableSource: Mu, useSyncExternalStore: Al, useId: Dc, unstable_isNewReconciler: !1 };
  function Hr(n, r) {
    if (n && n.defaultProps) {
      r = fe({}, r), n = n.defaultProps;
      for (var l in n) r[l] === void 0 && (r[l] = n[l]);
      return r;
    }
    return r;
  }
  function Vl(n, r, l, o) {
    r = n.memoizedState, l = l(o, r), l = l == null ? r : fe({}, r, l), n.memoizedState = l, n.lanes === 0 && (n.updateQueue.baseState = l);
  }
  var jl = { isMounted: function(n) {
    return (n = n._reactInternals) ? ze(n) === n : !1;
  }, enqueueSetState: function(n, r, l) {
    n = n._reactInternals;
    var o = Yn(), c = bi(n), d = Fr(o, c);
    d.payload = r, l != null && (d.callback = l), r = Zi(n, d, c), r !== null && (rn(r, n, c, o), sc(r, n, c));
  }, enqueueReplaceState: function(n, r, l) {
    n = n._reactInternals;
    var o = Yn(), c = bi(n), d = Fr(o, c);
    d.tag = 1, d.payload = r, l != null && (d.callback = l), r = Zi(n, d, c), r !== null && (rn(r, n, c, o), sc(r, n, c));
  }, enqueueForceUpdate: function(n, r) {
    n = n._reactInternals;
    var l = Yn(), o = bi(n), c = Fr(l, o);
    c.tag = 2, r != null && (c.callback = r), r = Zi(n, c, o), r !== null && (rn(r, n, o, l), sc(r, n, o));
  } };
  function Gv(n, r, l, o, c, d, m) {
    return n = n.stateNode, typeof n.shouldComponentUpdate == "function" ? n.shouldComponentUpdate(o, d, m) : r.prototype && r.prototype.isPureReactComponent ? !Uo(l, o) || !Uo(c, d) : !0;
  }
  function qv(n, r, l) {
    var o = !1, c = Za, d = r.contextType;
    return typeof d == "object" && d !== null ? d = Ta(d) : (c = Xt(r) ? Mr : Qe.current, o = r.contextTypes, d = (o = o != null) ? ya(n, c) : Za), r = new r(l, d), n.memoizedState = r.state !== null && r.state !== void 0 ? r.state : null, r.updater = jl, n.stateNode = r, r._reactInternals = n, o && (n = n.stateNode, n.__reactInternalMemoizedUnmaskedChildContext = c, n.__reactInternalMemoizedMaskedChildContext = d), r;
  }
  function Xv(n, r, l, o) {
    n = r.state, typeof r.componentWillReceiveProps == "function" && r.componentWillReceiveProps(l, o), typeof r.UNSAFE_componentWillReceiveProps == "function" && r.UNSAFE_componentWillReceiveProps(l, o), r.state !== n && jl.enqueueReplaceState(r, r.state, null);
  }
  function xd(n, r, l, o) {
    var c = n.stateNode;
    c.props = l, c.state = n.memoizedState, c.refs = {}, oc(n);
    var d = r.contextType;
    typeof d == "object" && d !== null ? c.context = Ta(d) : (d = Xt(r) ? Mr : Qe.current, c.context = ya(n, d)), c.state = n.memoizedState, d = r.getDerivedStateFromProps, typeof d == "function" && (Vl(n, r, d, l), c.state = n.memoizedState), typeof r.getDerivedStateFromProps == "function" || typeof c.getSnapshotBeforeUpdate == "function" || typeof c.UNSAFE_componentWillMount != "function" && typeof c.componentWillMount != "function" || (r = c.state, typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount(), r !== c.state && jl.enqueueReplaceState(c, c.state, null), cc(n, l, c, o), c.state = n.memoizedState), typeof c.componentDidMount == "function" && (n.flags |= 4194308);
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
  var Kv = typeof WeakMap == "function" ? WeakMap : Map;
  function Zv(n, r, l) {
    l = Fr(-1, l), l.tag = 3, l.payload = { element: null };
    var o = r.value;
    return l.callback = function() {
      jc || (jc = !0, Ud = o), Jo(n, r);
    }, l;
  }
  function Jv(n, r, l) {
    l = Fr(-1, l), l.tag = 3;
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
      o = n.pingCache = new Kv();
      var c = /* @__PURE__ */ new Set();
      o.set(r, c);
    } else c = o.get(r), c === void 0 && (c = /* @__PURE__ */ new Set(), o.set(r, c));
    c.has(l) || (c.add(l), n = Py.bind(null, n, r, l), r.then(n, n));
  }
  function eh(n) {
    do {
      var r;
      if ((r = n.tag === 13) && (r = n.memoizedState, r = r !== null ? r.dehydrated !== null : !0), r) return n;
      n = n.return;
    } while (n !== null);
    return null;
  }
  function bd(n, r, l, o, c) {
    return n.mode & 1 ? (n.flags |= 65536, n.lanes = c, n) : (n === r ? n.flags |= 65536 : (n.flags |= 128, l.flags |= 131072, l.flags &= -52805, l.tag === 1 && (l.alternate === null ? l.tag = 17 : (r = Fr(-1, 1), r.tag = 2, Zi(l, r, 1))), l.lanes |= 1), n);
  }
  var th = ot.ReactCurrentOwner, Vr = !1;
  function vn(n, r, l, o) {
    r.child = n === null ? Pv(r, null, l, o) : bu(r, n.child, l, o);
  }
  function Hu(n, r, l, o, c) {
    l = l.render;
    var d = r.ref;
    return Du(r, c), o = I(n, r, l, o, d, c), l = Tn(), n !== null && !Vr ? (r.updateQueue = n.updateQueue, r.flags &= -2053, n.lanes &= ~c, hn(n, r, c)) : (Wt && l && nc(r), r.flags |= 1, vn(n, r, o, c), r.child);
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
      if (Uo(d, o) && n.ref === r.ref) if (Vr = !1, r.pendingProps = o = d, (n.lanes & c) !== 0) n.flags & 131072 && (Vr = !0);
      else return r.lanes = n.lanes, hn(n, r, c);
    }
    return tt(n, r, l, o, c);
  }
  function jr(n, r, l) {
    var o = r.pendingProps, c = o.children, d = n !== null ? n.memoizedState : null;
    if (o.mode === "hidden") if (!(r.mode & 1)) r.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, Ot(Gu, Br), Br |= l;
    else {
      if (!(l & 1073741824)) return n = d !== null ? d.baseLanes | l : l, r.lanes = r.childLanes = 1073741824, r.memoizedState = { baseLanes: n, cachePool: null, transitions: null }, r.updateQueue = null, Ot(Gu, Br), Br |= n, null;
      r.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, o = d !== null ? d.baseLanes : l, Ot(Gu, Br), Br |= o;
    }
    else d !== null ? (o = d.baseLanes | l, r.memoizedState = null) : o = l, Ot(Gu, Br), Br |= o;
    return vn(n, r, c, l), r.child;
  }
  function Bl(n, r) {
    var l = r.ref;
    (n === null && l !== null || n !== null && n.ref !== l) && (r.flags |= 512, r.flags |= 2097152);
  }
  function tt(n, r, l, o, c) {
    var d = Xt(l) ? Mr : Qe.current;
    return d = ya(r, d), Du(r, c), l = I(n, r, l, o, d, c), o = Tn(), n !== null && !Vr ? (r.updateQueue = n.updateQueue, r.flags &= -2053, n.lanes &= ~c, hn(n, r, c)) : (Wt && o && nc(r), r.flags |= 1, vn(n, r, l, c), r.child);
  }
  function ts(n, r, l, o, c) {
    if (Xt(l)) {
      var d = !0;
      tc(r);
    } else d = !1;
    if (Du(r, c), r.stateNode === null) rs(n, r), qv(r, l, o), xd(r, l, o, c), o = !0;
    else if (n === null) {
      var m = r.stateNode, C = r.memoizedProps;
      m.props = C;
      var w = m.context, F = l.contextType;
      typeof F == "object" && F !== null ? F = Ta(F) : (F = Xt(l) ? Mr : Qe.current, F = ya(r, F));
      var W = l.getDerivedStateFromProps, X = typeof W == "function" || typeof m.getSnapshotBeforeUpdate == "function";
      X || typeof m.UNSAFE_componentWillReceiveProps != "function" && typeof m.componentWillReceiveProps != "function" || (C !== o || w !== F) && Xv(r, m, o, F), Ki = !1;
      var Q = r.memoizedState;
      m.state = Q, cc(r, o, m, c), w = r.memoizedState, C !== o || Q !== w || un.current || Ki ? (typeof W == "function" && (Vl(r, l, W, o), w = r.memoizedState), (C = Ki || Gv(r, l, C, o, Q, w, F)) ? (X || typeof m.UNSAFE_componentWillMount != "function" && typeof m.componentWillMount != "function" || (typeof m.componentWillMount == "function" && m.componentWillMount(), typeof m.UNSAFE_componentWillMount == "function" && m.UNSAFE_componentWillMount()), typeof m.componentDidMount == "function" && (r.flags |= 4194308)) : (typeof m.componentDidMount == "function" && (r.flags |= 4194308), r.memoizedProps = o, r.memoizedState = w), m.props = o, m.state = w, m.context = F, o = C) : (typeof m.componentDidMount == "function" && (r.flags |= 4194308), o = !1);
    } else {
      m = r.stateNode, _u(n, r), C = r.memoizedProps, F = r.type === r.elementType ? C : Hr(r.type, C), m.props = F, X = r.pendingProps, Q = m.context, w = l.contextType, typeof w == "object" && w !== null ? w = Ta(w) : (w = Xt(l) ? Mr : Qe.current, w = ya(r, w));
      var he = l.getDerivedStateFromProps;
      (W = typeof he == "function" || typeof m.getSnapshotBeforeUpdate == "function") || typeof m.UNSAFE_componentWillReceiveProps != "function" && typeof m.componentWillReceiveProps != "function" || (C !== X || Q !== w) && Xv(r, m, o, w), Ki = !1, Q = r.memoizedState, m.state = Q, cc(r, o, m, c);
      var Ce = r.memoizedState;
      C !== X || Q !== Ce || un.current || Ki ? (typeof he == "function" && (Vl(r, l, he, o), Ce = r.memoizedState), (F = Ki || Gv(r, l, F, o, Q, Ce, w) || !1) ? (W || typeof m.UNSAFE_componentWillUpdate != "function" && typeof m.componentWillUpdate != "function" || (typeof m.componentWillUpdate == "function" && m.componentWillUpdate(o, Ce, w), typeof m.UNSAFE_componentWillUpdate == "function" && m.UNSAFE_componentWillUpdate(o, Ce, w)), typeof m.componentDidUpdate == "function" && (r.flags |= 4), typeof m.getSnapshotBeforeUpdate == "function" && (r.flags |= 1024)) : (typeof m.componentDidUpdate != "function" || C === n.memoizedProps && Q === n.memoizedState || (r.flags |= 4), typeof m.getSnapshotBeforeUpdate != "function" || C === n.memoizedProps && Q === n.memoizedState || (r.flags |= 1024), r.memoizedProps = o, r.memoizedState = Ce), m.props = o, m.state = Ce, m.context = w, o = F) : (typeof m.componentDidUpdate != "function" || C === n.memoizedProps && Q === n.memoizedState || (r.flags |= 4), typeof m.getSnapshotBeforeUpdate != "function" || C === n.memoizedProps && Q === n.memoizedState || (r.flags |= 1024), o = !1);
    }
    return Oc(n, r, l, o, d, c);
  }
  function Oc(n, r, l, o, c, d) {
    Bl(n, r);
    var m = (r.flags & 128) !== 0;
    if (!o && !m) return c && Fv(r, l, !1), hn(n, r, d);
    o = r.stateNode, th.current = r;
    var C = m && typeof l.getDerivedStateFromError != "function" ? null : o.render();
    return r.flags |= 1, n !== null && m ? (r.child = bu(r, n.child, null, d), r.child = bu(r, null, C, d)) : vn(n, r, C, d), r.memoizedState = o.state, c && Fv(r, l, !0), r.child;
  }
  function Ny(n) {
    var r = n.stateNode;
    r.pendingContext ? qi(n, r.pendingContext, r.pendingContext !== r.context) : r.context && qi(n, r.context, !1), Sd(n, r.containerInfo);
  }
  function nh(n, r, l, o, c) {
    return nn(), md(c), r.flags |= 256, vn(n, r, l, o), r.child;
  }
  var ns = { dehydrated: null, treeContext: null, retryLane: 0 };
  function Pl(n) {
    return { baseLanes: n, cachePool: null, transitions: null };
  }
  function rh(n, r, l) {
    var o = r.pendingProps, c = Kt.current, d = !1, m = (r.flags & 128) !== 0, C;
    if ((C = m) || (C = n !== null && n.memoizedState === null ? !1 : (c & 2) !== 0), C ? (d = !0, r.flags &= -129) : (n === null || n.memoizedState !== null) && (c |= 1), Ot(Kt, c & 1), n === null)
      return ac(r), n = r.memoizedState, n !== null && (n = n.dehydrated, n !== null) ? (r.mode & 1 ? n.data === "$!" ? r.lanes = 8 : r.lanes = 1073741824 : r.lanes = 1, null) : (m = o.children, n = o.fallback, d ? (o = r.mode, d = r.child, m = { mode: "hidden", children: m }, !(o & 1) && d !== null ? (d.childLanes = 0, d.pendingProps = m) : d = Wc(m, o, 0, null), n = Gl(n, o, l, null), d.return = r, n.return = r, d.sibling = n, r.child = d, r.child.memoizedState = Pl(l), r.memoizedState = ns, n) : Lc(r, m));
    if (c = n.memoizedState, c !== null && (C = c.dehydrated, C !== null)) return Dd(n, r, m, o, C, c, l);
    if (d) {
      d = o.fallback, m = r.mode, c = n.child, C = c.sibling;
      var w = { mode: "hidden", children: o.children };
      return !(m & 1) && r.child !== c ? (o = r.child, o.childLanes = 0, o.pendingProps = w, r.deletions = null) : (o = al(c, w), o.subtreeFlags = c.subtreeFlags & 14680064), C !== null ? d = al(C, d) : (d = Gl(d, m, l, null), d.flags |= 2), d.return = r, o.return = r, o.sibling = d, r.child = o, o = d, d = r.child, m = n.child.memoizedState, m = m === null ? Pl(l) : { baseLanes: m.baseLanes | l, cachePool: null, transitions: m.transitions }, d.memoizedState = m, d.childLanes = n.childLanes & ~l, r.memoizedState = ns, o;
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
      if (o = c.nextSibling && c.nextSibling.dataset, o) var C = o.dgst;
      return o = C, d = Error(y(419)), o = wd(d, o, void 0), Mc(n, r, m, o);
    }
    if (C = (m & n.childLanes) !== 0, Vr || C) {
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
    return c.data === "$?" ? (r.flags |= 128, r.child = n.child, r = Hd.bind(null, n), c._reactRetry = r, null) : (n = d.treeContext, Ar = $a(c.nextSibling), Jr = r, Wt = !0, Ea = null, n !== null && (zr[cr++] = Xn, zr[cr++] = Ei, zr[cr++] = Sa, Xn = n.id, Ei = n.overflow, Sa = r), r = Lc(r, o.children), r.flags |= 4096, r);
  }
  function ah(n, r, l) {
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
        if (n.tag === 13) n.memoizedState !== null && ah(n, l, r);
        else if (n.tag === 19) ah(n, l, r);
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
        Qv(r);
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
          return o.dehydrated !== null ? (Ot(Kt, Kt.current & 1), r.flags |= 128, null) : l & r.child.childLanes ? rh(n, r, l) : (Ot(Kt, Kt.current & 1), n = hn(n, r, l), n !== null ? n.sibling : null);
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
        return r.lanes = 0, jr(n, r, l);
    }
    return hn(n, r, l);
  }
  var ei, Vu, ju, xa;
  ei = function(n, r) {
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
          c = wn(n, c), o = wn(n, o), d = [];
          break;
        case "select":
          c = fe({}, c, { value: void 0 }), o = fe({}, o, { value: void 0 }), d = [];
          break;
        case "textarea":
          c = Z(n, c), o = Z(n, o), d = [];
          break;
        default:
          typeof c.onClick != "function" && typeof o.onClick == "function" && (n.onclick = ec);
      }
      Fn(l, o);
      var m;
      l = null;
      for (F in c) if (!o.hasOwnProperty(F) && c.hasOwnProperty(F) && c[F] != null) if (F === "style") {
        var C = c[F];
        for (m in C) C.hasOwnProperty(m) && (l || (l = {}), l[m] = "");
      } else F !== "dangerouslySetInnerHTML" && F !== "children" && F !== "suppressContentEditableWarning" && F !== "suppressHydrationWarning" && F !== "autoFocus" && (Y.hasOwnProperty(F) ? d || (d = []) : (d = d || []).push(F, null));
      for (F in o) {
        var w = o[F];
        if (C = c != null ? c[F] : void 0, o.hasOwnProperty(F) && w !== C && (w != null || C != null)) if (F === "style") if (C) {
          for (m in C) !C.hasOwnProperty(m) || w && w.hasOwnProperty(m) || (l || (l = {}), l[m] = "");
          for (m in w) w.hasOwnProperty(m) && C[m] !== w[m] && (l || (l = {}), l[m] = w[m]);
        } else l || (d || (d = []), d.push(
          F,
          l
        )), l = w;
        else F === "dangerouslySetInnerHTML" ? (w = w ? w.__html : void 0, C = C ? C.__html : void 0, w != null && C !== w && (d = d || []).push(F, w)) : F === "children" ? typeof w != "string" && typeof w != "number" || (d = d || []).push(F, "" + w) : F !== "suppressContentEditableWarning" && F !== "suppressHydrationWarning" && (Y.hasOwnProperty(F) ? (w != null && F === "onScroll" && Vt("scroll", n), d || C === w || (d = [])) : (d = d || []).push(F, w));
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
  function pr(n) {
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
        return pr(r), null;
      case 1:
        return Xt(r.type) && ga(), pr(r), null;
      case 3:
        return o = r.stateNode, Ou(), Dt(un), Dt(Qe), Cd(), o.pendingContext && (o.context = o.pendingContext, o.pendingContext = null), (n === null || n.child === null) && (ic(r) ? r.flags |= 4 : n === null || n.memoizedState.isDehydrated && !(r.flags & 256) || (r.flags |= 1024, Ea !== null && (zd(Ea), Ea = null))), Vu(n, r), pr(r), null;
      case 5:
        Ed(r);
        var c = zl(Wo.current);
        if (l = r.type, n !== null && r.stateNode != null) ju(n, r, l, o, c), n.ref !== r.ref && (r.flags |= 512, r.flags |= 2097152);
        else {
          if (!o) {
            if (r.stateNode === null) throw Error(y(166));
            return pr(r), null;
          }
          if (n = zl(Ya.current), ic(r)) {
            o = r.stateNode, l = r.type;
            var d = r.memoizedProps;
            switch (o[Ka] = r, o[Ll] = d, n = (r.mode & 1) !== 0, l) {
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
                zn(o, d), Vt("invalid", o);
                break;
              case "select":
                o._wrapperState = { wasMultiple: !!d.multiple }, Vt("invalid", o);
                break;
              case "textarea":
                q(o, d), Vt("invalid", o);
            }
            Fn(l, d), c = null;
            for (var m in d) if (d.hasOwnProperty(m)) {
              var C = d[m];
              m === "children" ? typeof C == "string" ? o.textContent !== C && (d.suppressHydrationWarning !== !0 && Js(o.textContent, C, n), c = ["children", C]) : typeof C == "number" && o.textContent !== "" + C && (d.suppressHydrationWarning !== !0 && Js(
                o.textContent,
                C,
                n
              ), c = ["children", "" + C]) : Y.hasOwnProperty(m) && C != null && m === "onScroll" && Vt("scroll", o);
            }
            switch (l) {
              case "input":
                Gn(o), x(o, d, !0);
                break;
              case "textarea":
                Gn(o), Je(o);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof d.onClick == "function" && (o.onclick = ec);
            }
            o = c, r.updateQueue = o, o !== null && (r.flags |= 4);
          } else {
            m = c.nodeType === 9 ? c : c.ownerDocument, n === "http://www.w3.org/1999/xhtml" && (n = _t(l)), n === "http://www.w3.org/1999/xhtml" ? l === "script" ? (n = m.createElement("div"), n.innerHTML = "<script><\/script>", n = n.removeChild(n.firstChild)) : typeof o.is == "string" ? n = m.createElement(l, { is: o.is }) : (n = m.createElement(l), l === "select" && (m = n, o.multiple ? m.multiple = !0 : o.size && (m.size = o.size))) : n = m.createElementNS(n, l), n[Ka] = r, n[Ll] = o, ei(n, r, !1, !1), r.stateNode = n;
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
                  zn(n, o), c = wn(n, o), Vt("invalid", n);
                  break;
                case "option":
                  c = o;
                  break;
                case "select":
                  n._wrapperState = { wasMultiple: !!o.multiple }, c = fe({}, o, { value: void 0 }), Vt("invalid", n);
                  break;
                case "textarea":
                  q(n, o), c = Z(n, o), Vt("invalid", n);
                  break;
                default:
                  c = o;
              }
              Fn(l, c), C = c;
              for (d in C) if (C.hasOwnProperty(d)) {
                var w = C[d];
                d === "style" ? bt(n, w) : d === "dangerouslySetInnerHTML" ? (w = w ? w.__html : void 0, w != null && Ga(n, w)) : d === "children" ? typeof w == "string" ? (l !== "textarea" || w !== "") && yr(n, w) : typeof w == "number" && yr(n, "" + w) : d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && d !== "autoFocus" && (Y.hasOwnProperty(d) ? w != null && d === "onScroll" && Vt("scroll", n) : w != null && Ie(n, d, w, m));
              }
              switch (l) {
                case "input":
                  Gn(n), x(n, o, !1);
                  break;
                case "textarea":
                  Gn(n), Je(n);
                  break;
                case "option":
                  o.value != null && n.setAttribute("value", "" + gn(o.value));
                  break;
                case "select":
                  n.multiple = !!o.multiple, d = o.value, d != null ? te(n, !!o.multiple, d, !1) : o.defaultValue != null && te(
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
        return pr(r), null;
      case 6:
        if (n && r.stateNode != null) xa(n, r, n.memoizedProps, o);
        else {
          if (typeof o != "string" && r.stateNode === null) throw Error(y(166));
          if (l = zl(Wo.current), zl(Ya.current), ic(r)) {
            if (o = r.stateNode, l = r.memoizedProps, o[Ka] = r, (d = o.nodeValue !== l) && (n = Jr, n !== null)) switch (n.tag) {
              case 3:
                Js(o.nodeValue, l, (n.mode & 1) !== 0);
                break;
              case 5:
                n.memoizedProps.suppressHydrationWarning !== !0 && Js(o.nodeValue, l, (n.mode & 1) !== 0);
            }
            d && (r.flags |= 4);
          } else o = (l.nodeType === 9 ? l : l.ownerDocument).createTextNode(o), o[Ka] = r, r.stateNode = o;
        }
        return pr(r), null;
      case 13:
        if (Dt(Kt), o = r.memoizedState, n === null || n.memoizedState !== null && n.memoizedState.dehydrated !== null) {
          if (Wt && Ar !== null && r.mode & 1 && !(r.flags & 128)) jv(), nn(), r.flags |= 98560, d = !1;
          else if (d = ic(r), o !== null && o.dehydrated !== null) {
            if (n === null) {
              if (!d) throw Error(y(318));
              if (d = r.memoizedState, d = d !== null ? d.dehydrated : null, !d) throw Error(y(317));
              d[Ka] = r;
            } else nn(), !(r.flags & 128) && (r.memoizedState = null), r.flags |= 4;
            pr(r), d = !1;
          } else Ea !== null && (zd(Ea), Ea = null), d = !0;
          if (!d) return r.flags & 65536 ? r : null;
        }
        return r.flags & 128 ? (r.lanes = l, r) : (o = o !== null, o !== (n !== null && n.memoizedState !== null) && o && (r.child.flags |= 8192, r.mode & 1 && (n === null || Kt.current & 1 ? kn === 0 && (kn = 3) : os())), r.updateQueue !== null && (r.flags |= 4), pr(r), null);
      case 4:
        return Ou(), Vu(n, r), n === null && Ru(r.stateNode.containerInfo), pr(r), null;
      case 10:
        return yd(r.type._context), pr(r), null;
      case 17:
        return Xt(r.type) && ga(), pr(r), null;
      case 19:
        if (Dt(Kt), d = r.memoizedState, d === null) return pr(r), null;
        if (o = (r.flags & 128) !== 0, m = d.rendering, m === null) if (o) on(d, !1);
        else {
          if (kn !== 0 || n !== null && n.flags & 128) for (n = r.child; n !== null; ) {
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
            if (r.flags |= 128, o = !0, l = n.updateQueue, l !== null && (r.updateQueue = l, r.flags |= 4), on(d, !0), d.tail === null && d.tailMode === "hidden" && !m.alternate && !Wt) return pr(r), null;
          } else 2 * kt() - d.renderingStartTime > Xu && l !== 1073741824 && (r.flags |= 128, o = !0, on(d, !1), r.lanes = 4194304);
          d.isBackwards ? (m.sibling = r.child, r.child = m) : (l = d.last, l !== null ? l.sibling = m : r.child = m, d.last = m);
        }
        return d.tail !== null ? (r = d.tail, d.rendering = r, d.tail = r.sibling, d.renderingStartTime = kt(), r.sibling = null, l = Kt.current, Ot(Kt, o ? l & 1 | 2 : l & 1), r) : (pr(r), null);
      case 22:
      case 23:
        return Yc(), o = r.memoizedState !== null, n !== null && n.memoizedState !== null !== o && (r.flags |= 8192), o && r.mode & 1 ? Br & 1073741824 && (pr(r), r.subtreeFlags & 6 && (r.flags |= 8192)) : pr(r), null;
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
  var Bu = !1, Zn = !1, Uc = typeof WeakSet == "function" ? WeakSet : Set, ge = null;
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
          var m = 0, C = -1, w = -1, F = 0, W = 0, X = n, Q = null;
          t: for (; ; ) {
            for (var he; X !== l || c !== 0 && X.nodeType !== 3 || (C = m + c), X !== d || o !== 0 && X.nodeType !== 3 || (w = m + o), X.nodeType === 3 && (m += X.nodeValue.length), (he = X.firstChild) !== null; )
              Q = X, X = he;
            for (; ; ) {
              if (X === n) break t;
              if (Q === l && ++F === c && (C = m), Q === d && ++W === o && (w = m), (he = X.nextSibling) !== null) break;
              X = Q, Q = X.parentNode;
            }
            X = he;
          }
          l = C === -1 || w === -1 ? null : { start: C, end: w };
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
              var we = Ce.memoizedProps, mn = Ce.memoizedState, k = r.stateNode, D = k.getSnapshotBeforeUpdate(r.elementType === r.type ? we : Hr(r.type, we), mn);
              k.__reactInternalSnapshotBeforeUpdate = D;
            }
            break;
          case 3:
            var N = r.stateNode.containerInfo;
            N.nodeType === 1 ? N.textContent = "" : N.nodeType === 9 && N.documentElement && N.removeChild(N.documentElement);
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
  function ih(n) {
    var r = n.alternate;
    r !== null && (n.alternate = null, ih(r)), n.child = null, n.deletions = null, n.sibling = null, n.tag === 5 && (r = n.stateNode, r !== null && (delete r[Ka], delete r[Ll], delete r[sd], delete r[Oy], delete r[cd])), n.stateNode = null, n.return = null, n.dependencies = null, n.memoizedProps = null, n.memoizedState = null, n.pendingProps = null, n.stateNode = null, n.updateQueue = null;
  }
  function Od(n) {
    return n.tag === 5 || n.tag === 3 || n.tag === 4;
  }
  function lh(n) {
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
  var Zt = null, Pn = !1;
  function gr(n, r, l) {
    for (l = l.child; l !== null; ) Iu(n, r, l), l = l.sibling;
  }
  function Iu(n, r, l) {
    if (Ha && typeof Ha.onCommitFiberUnmount == "function") try {
      Ha.onCommitFiberUnmount(To, l);
    } catch {
    }
    switch (l.tag) {
      case 5:
        Zn || Pu(l, r);
      case 6:
        var o = Zt, c = Pn;
        Zt = null, gr(n, r, l), Zt = o, Pn = c, Zt !== null && (Pn ? (n = Zt, l = l.stateNode, n.nodeType === 8 ? n.parentNode.removeChild(l) : n.removeChild(l)) : Zt.removeChild(l.stateNode));
        break;
      case 18:
        Zt !== null && (Pn ? (n = Zt, l = l.stateNode, n.nodeType === 8 ? Qi(n.parentNode, l) : n.nodeType === 1 && Qi(n, l), Do(n)) : Qi(Zt, l.stateNode));
        break;
      case 4:
        o = Zt, c = Pn, Zt = l.stateNode.containerInfo, Pn = !0, gr(n, r, l), Zt = o, Pn = c;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!Zn && (o = l.updateQueue, o !== null && (o = o.lastEffect, o !== null))) {
          c = o = o.next;
          do {
            var d = c, m = d.destroy;
            d = d.tag, m !== void 0 && (d & 2 || d & 4) && kd(l, r, m), c = c.next;
          } while (c !== o);
        }
        gr(n, r, l);
        break;
      case 1:
        if (!Zn && (Pu(l, r), o = l.stateNode, typeof o.componentWillUnmount == "function")) try {
          o.props = l.memoizedProps, o.state = l.memoizedState, o.componentWillUnmount();
        } catch (C) {
          cn(l, r, C);
        }
        gr(n, r, l);
        break;
      case 21:
        gr(n, r, l);
        break;
      case 22:
        l.mode & 1 ? (Zn = (o = Zn) || l.memoizedState !== null, gr(n, r, l), Zn = o) : gr(n, r, l);
        break;
      default:
        gr(n, r, l);
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
  function $n(n, r) {
    var l = r.deletions;
    if (l !== null) for (var o = 0; o < l.length; o++) {
      var c = l[o];
      try {
        var d = n, m = r, C = m;
        e: for (; C !== null; ) {
          switch (C.tag) {
            case 5:
              Zt = C.stateNode, Pn = !1;
              break e;
            case 3:
              Zt = C.stateNode.containerInfo, Pn = !0;
              break e;
            case 4:
              Zt = C.stateNode.containerInfo, Pn = !0;
              break e;
          }
          C = C.return;
        }
        if (Zt === null) throw Error(y(160));
        Iu(d, m, c), Zt = null, Pn = !1;
        var w = c.alternate;
        w !== null && (w.return = null), c.return = null;
      } catch (F) {
        cn(c, r, F);
      }
    }
    if (r.subtreeFlags & 12854) for (r = r.child; r !== null; ) uh(r, n), r = r.sibling;
  }
  function uh(n, r) {
    var l = n.alternate, o = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if ($n(r, n), ti(n), o & 4) {
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
        $n(r, n), ti(n), o & 512 && l !== null && Pu(l, l.return);
        break;
      case 5:
        if ($n(r, n), ti(n), o & 512 && l !== null && Pu(l, l.return), n.flags & 32) {
          var c = n.stateNode;
          try {
            yr(c, "");
          } catch (we) {
            cn(n, n.return, we);
          }
        }
        if (o & 4 && (c = n.stateNode, c != null)) {
          var d = n.memoizedProps, m = l !== null ? l.memoizedProps : d, C = n.type, w = n.updateQueue;
          if (n.updateQueue = null, w !== null) try {
            C === "input" && d.type === "radio" && d.name != null && An(c, d), pn(C, m);
            var F = pn(C, d);
            for (m = 0; m < w.length; m += 2) {
              var W = w[m], X = w[m + 1];
              W === "style" ? bt(c, X) : W === "dangerouslySetInnerHTML" ? Ga(c, X) : W === "children" ? yr(c, X) : Ie(c, W, X, F);
            }
            switch (C) {
              case "input":
                qn(c, d);
                break;
              case "textarea":
                Se(c, d);
                break;
              case "select":
                var Q = c._wrapperState.wasMultiple;
                c._wrapperState.wasMultiple = !!d.multiple;
                var he = d.value;
                he != null ? te(c, !!d.multiple, he, !1) : Q !== !!d.multiple && (d.defaultValue != null ? te(
                  c,
                  !!d.multiple,
                  d.defaultValue,
                  !0
                ) : te(c, !!d.multiple, d.multiple ? [] : "", !1));
            }
            c[Ll] = d;
          } catch (we) {
            cn(n, n.return, we);
          }
        }
        break;
      case 6:
        if ($n(r, n), ti(n), o & 4) {
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
        if ($n(r, n), ti(n), o & 4 && l !== null && l.memoizedState.isDehydrated) try {
          Do(r.containerInfo);
        } catch (we) {
          cn(n, n.return, we);
        }
        break;
      case 4:
        $n(r, n), ti(n);
        break;
      case 13:
        $n(r, n), ti(n), c = n.child, c.flags & 8192 && (d = c.memoizedState !== null, c.stateNode.isHidden = d, !d || c.alternate !== null && c.alternate.memoizedState !== null || (Vc = kt())), o & 4 && Qu(n);
        break;
      case 22:
        if (W = l !== null && l.memoizedState !== null, n.mode & 1 ? (Zn = (F = Zn) || W, $n(r, n), Zn = F) : $n(r, n), ti(n), o & 8192) {
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
                    oh(X);
                    continue;
                  }
              }
              he !== null ? (he.return = Q, ge = he) : oh(X);
            }
            W = W.sibling;
          }
          e: for (W = null, X = n; ; ) {
            if (X.tag === 5) {
              if (W === null) {
                W = X;
                try {
                  c = X.stateNode, F ? (d = c.style, typeof d.setProperty == "function" ? d.setProperty("display", "none", "important") : d.display = "none") : (C = X.stateNode, w = X.memoizedProps.style, m = w != null && w.hasOwnProperty("display") ? w.display : null, C.style.display = rt("display", m));
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
        $n(r, n), ti(n), o & 4 && Qu(n);
        break;
      case 21:
        break;
      default:
        $n(
          r,
          n
        ), ti(n);
    }
  }
  function ti(n) {
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
            o.flags & 32 && (yr(c, ""), o.flags &= -33);
            var d = lh(n);
            Yu(n, d, c);
            break;
          case 3:
          case 4:
            var m = o.stateNode.containerInfo, C = lh(n);
            as(n, C, m);
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
          var C = c.alternate, w = C !== null && C.memoizedState !== null || Zn;
          C = Bu;
          var F = Zn;
          if (Bu = m, (Zn = w) && !F) for (ge = c; ge !== null; ) m = ge, w = m.child, m.tag === 22 && m.memoizedState !== null ? Md(c) : w !== null ? (w.return = m, ge = w) : Md(c);
          for (; d !== null; ) ge = d, Ld(d), d = d.sibling;
          ge = c, Bu = C, Zn = F;
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
              Zn || Ac(5, r);
              break;
            case 1:
              var o = r.stateNode;
              if (r.flags & 4 && !Zn) if (l === null) o.componentDidMount();
              else {
                var c = r.elementType === r.type ? l.memoizedProps : Hr(r.type, l.memoizedProps);
                o.componentDidUpdate(c, l.memoizedState, o.__reactInternalSnapshotBeforeUpdate);
              }
              var d = r.updateQueue;
              d !== null && Iv(r, d, o);
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
                Iv(r, m, l);
              }
              break;
            case 5:
              var C = r.stateNode;
              if (l === null && r.flags & 4) {
                l = C;
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
          Zn || r.flags & 512 && Fc(r);
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
  function oh(n) {
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
      var C = r.sibling;
      if (C !== null) {
        C.return = r.return, ge = C;
        break;
      }
      ge = r.return;
    }
  }
  var Hy = Math.ceil, $l = ot.ReactCurrentDispatcher, Hc = ot.ReactCurrentOwner, wa = ot.ReactCurrentBatchConfig, ct = 0, sn = null, Gt = null, _n = 0, Br = 0, Gu = nt(0), kn = 0, is = null, Yl = 0, qu = 0, Nd = 0, nl = null, vr = null, Vc = 0, Xu = 1 / 0, wi = null, jc = !1, Ud = null, ba = null, Ku = !1, Da = null, Bc = 0, ls = 0, Pc = null, us = -1, Il = 0;
  function Yn() {
    return ct & 6 ? kt() : us !== -1 ? us : us = kt();
  }
  function bi(n) {
    return n.mode & 1 ? ct & 2 && _n !== 0 ? _n & -_n : lc.transition !== null ? (Il === 0 && (Il = As()), Il) : (n = Mt, n !== 0 || (n = window.event, n = n === void 0 ? 16 : jf(n.type)), n) : 1;
  }
  function rn(n, r, l, o) {
    if (50 < ls) throw ls = 0, Pc = null, Error(y(185));
    Rl(n, l, o), (!(ct & 2) || n !== sn) && (n === sn && (!(ct & 2) && (qu |= l), kn === 4 && ni(n, _n)), On(n, o), l === 1 && ct === 0 && !(r.mode & 1) && (Xu = kt() + 500, Bn && Nr()));
  }
  function On(n, r) {
    var l = n.callbackNode;
    zs(n, r);
    var o = Va(n, n === sn ? _n : 0);
    if (o === 0) l !== null && tn(l), n.callbackNode = null, n.callbackPriority = 0;
    else if (r = o & -o, n.callbackPriority !== r) {
      if (l != null && tn(l), r === 1) n.tag === 0 ? dd(Zu.bind(null, n)) : fd(Zu.bind(null, n)), od(function() {
        !(ct & 6) && Nr();
      }), l = null;
      else {
        switch (Ff(o)) {
          case 1:
            l = qr;
            break;
          case 4:
            l = lt;
            break;
          case 16:
            l = Xa;
            break;
          case 536870912:
            l = Nf;
            break;
          default:
            l = Xa;
        }
        l = mh(l, $c.bind(null, n));
      }
      n.callbackPriority = r, n.callbackNode = l;
    }
  }
  function $c(n, r) {
    if (us = -1, Il = 0, ct & 6) throw Error(y(327));
    var l = n.callbackNode;
    if (Ju() && n.callbackNode !== l) return null;
    var o = Va(n, n === sn ? _n : 0);
    if (o === 0) return null;
    if (o & 30 || o & n.expiredLanes || r) r = Ic(n, o);
    else {
      r = o;
      var c = ct;
      ct |= 2;
      var d = ch();
      (sn !== n || _n !== r) && (wi = null, Xu = kt() + 500, Wl(n, r));
      do
        try {
          jy();
          break;
        } catch (C) {
          sh(n, C);
        }
      while (!0);
      ea(), $l.current = d, ct = c, Gt !== null ? r = 0 : (sn = null, _n = 0, r = kn);
    }
    if (r !== 0) {
      if (r === 2 && (c = zf(n), c !== 0 && (o = c, r = Ql(n, c))), r === 1) throw l = is, Wl(n, 0), ni(n, o), On(n, kt()), l;
      if (r === 6) ni(n, o);
      else {
        if (c = n.current.alternate, !(o & 30) && !Ad(c) && (r = Ic(n, o), r === 2 && (d = zf(n), d !== 0 && (o = d, r = Ql(n, d))), r === 1)) throw l = is, Wl(n, 0), ni(n, o), On(n, kt()), l;
        switch (n.finishedWork = c, n.finishedLanes = o, r) {
          case 0:
          case 1:
            throw Error(y(345));
          case 2:
            rl(n, vr, wi);
            break;
          case 3:
            if (ni(n, o), (o & 130023424) === o && (r = Vc + 500 - kt(), 10 < r)) {
              if (Va(n, 0) !== 0) break;
              if (c = n.suspendedLanes, (c & o) !== o) {
                Yn(), n.pingedLanes |= n.suspendedLanes & c;
                break;
              }
              n.timeoutHandle = Ol(rl.bind(null, n, vr, wi), r);
              break;
            }
            rl(n, vr, wi);
            break;
          case 4:
            if (ni(n, o), (o & 4194240) === o) break;
            for (r = n.eventTimes, c = -1; 0 < o; ) {
              var m = 31 - da(o);
              d = 1 << m, m = r[m], m > c && (c = m), o &= ~d;
            }
            if (o = c, o = kt() - o, o = (120 > o ? 120 : 480 > o ? 480 : 1080 > o ? 1080 : 1920 > o ? 1920 : 3e3 > o ? 3e3 : 4320 > o ? 4320 : 1960 * Hy(o / 1960)) - o, 10 < o) {
              n.timeoutHandle = Ol(rl.bind(null, n, vr, wi), o);
              break;
            }
            rl(n, vr, wi);
            break;
          case 5:
            rl(n, vr, wi);
            break;
          default:
            throw Error(y(329));
        }
      }
    }
    return On(n, kt()), n.callbackNode === l ? $c.bind(null, n) : null;
  }
  function Ql(n, r) {
    var l = nl;
    return n.current.memoizedState.isDehydrated && (Wl(n, r).flags |= 256), n = Ic(n, r), n !== 2 && (r = vr, vr = l, r !== null && zd(r)), n;
  }
  function zd(n) {
    vr === null ? vr = n : vr.push.apply(vr, n);
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
  function ni(n, r) {
    for (r &= ~Nd, r &= ~qu, n.suspendedLanes |= r, n.pingedLanes &= ~r, n = n.expirationTimes; 0 < r; ) {
      var l = 31 - da(r), o = 1 << l;
      n[l] = -1, r &= ~o;
    }
  }
  function Zu(n) {
    if (ct & 6) throw Error(y(327));
    Ju();
    var r = Va(n, 0);
    if (!(r & 1)) return On(n, kt()), null;
    var l = Ic(n, r);
    if (n.tag !== 0 && l === 2) {
      var o = zf(n);
      o !== 0 && (r = o, l = Ql(n, o));
    }
    if (l === 1) throw l = is, Wl(n, 0), ni(n, r), On(n, kt()), l;
    if (l === 6) throw Error(y(345));
    return n.finishedWork = n.current.alternate, n.finishedLanes = r, rl(n, vr, wi), On(n, kt()), null;
  }
  function Fd(n, r) {
    var l = ct;
    ct |= 1;
    try {
      return n(r);
    } finally {
      ct = l, ct === 0 && (Xu = kt() + 500, Bn && Nr());
    }
  }
  function ri(n) {
    Da !== null && Da.tag === 0 && !(ct & 6) && Ju();
    var r = ct;
    ct |= 1;
    var l = wa.transition, o = Mt;
    try {
      if (wa.transition = null, Mt = 1, n) return n();
    } finally {
      Mt = o, wa.transition = l, ct = r, !(ct & 6) && Nr();
    }
  }
  function Yc() {
    Br = Gu.current, Dt(Gu);
  }
  function Wl(n, r) {
    n.finishedWork = null, n.finishedLanes = 0;
    var l = n.timeoutHandle;
    if (l !== -1 && (n.timeoutHandle = -1, Av(l)), Gt !== null) for (l = Gt.return; l !== null; ) {
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
    if (sn = n, Gt = n = al(n.current, null), _n = Br = r, kn = 0, is = null, Nd = qu = Yl = 0, vr = nl = null, Ul !== null) {
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
  function sh(n, r) {
    do {
      var l = Gt;
      try {
        if (ea(), pc.current = dr, ta) {
          for (var o = Oe.memoizedState; o !== null; ) {
            var c = o.queue;
            c !== null && (c.pending = null), o = o.next;
          }
          ta = !1;
        }
        if (De = 0, ut = We = Oe = null, Lu = !1, qo = 0, Hc.current = null, l === null || l.return === null) {
          kn = 1, is = r, Gt = null;
          break;
        }
        e: {
          var d = n, m = l.return, C = l, w = r;
          if (r = _n, C.flags |= 32768, w !== null && typeof w == "object" && typeof w.then == "function") {
            var F = w, W = C, X = W.tag;
            if (!(W.mode & 1) && (X === 0 || X === 11 || X === 15)) {
              var Q = W.alternate;
              Q ? (W.updateQueue = Q.updateQueue, W.memoizedState = Q.memoizedState, W.lanes = Q.lanes) : (W.updateQueue = null, W.memoizedState = null);
            }
            var he = eh(m);
            if (he !== null) {
              he.flags &= -257, bd(he, m, C, d, r), he.mode & 1 && es(d, F, r), r = he, w = F;
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
          } else if (Wt && C.mode & 1) {
            var mn = eh(m);
            if (mn !== null) {
              !(mn.flags & 65536) && (mn.flags |= 256), bd(mn, m, C, d, r), md(el(w, C));
              break e;
            }
          }
          d = w = el(w, C), kn !== 4 && (kn = 2), nl === null ? nl = [d] : nl.push(d), d = m;
          do {
            switch (d.tag) {
              case 3:
                d.flags |= 65536, r &= -r, d.lanes |= r;
                var k = Zv(d, w, r);
                Yv(d, k);
                break e;
              case 1:
                C = w;
                var D = d.type, N = d.stateNode;
                if (!(d.flags & 128) && (typeof D.getDerivedStateFromError == "function" || N !== null && typeof N.componentDidCatch == "function" && (ba === null || !ba.has(N)))) {
                  d.flags |= 65536, r &= -r, d.lanes |= r;
                  var J = Jv(d, C, r);
                  Yv(d, J);
                  break e;
                }
            }
            d = d.return;
          } while (d !== null);
        }
        dh(l);
      } catch (_e) {
        r = _e, Gt === l && l !== null && (Gt = l = l.return);
        continue;
      }
      break;
    } while (!0);
  }
  function ch() {
    var n = $l.current;
    return $l.current = dr, n === null ? dr : n;
  }
  function os() {
    (kn === 0 || kn === 3 || kn === 2) && (kn = 4), sn === null || !(Yl & 268435455) && !(qu & 268435455) || ni(sn, _n);
  }
  function Ic(n, r) {
    var l = ct;
    ct |= 2;
    var o = ch();
    (sn !== n || _n !== r) && (wi = null, Wl(n, r));
    do
      try {
        Vy();
        break;
      } catch (c) {
        sh(n, c);
      }
    while (!0);
    if (ea(), ct = l, $l.current = o, Gt !== null) throw Error(y(261));
    return sn = null, _n = 0, kn;
  }
  function Vy() {
    for (; Gt !== null; ) fh(Gt);
  }
  function jy() {
    for (; Gt !== null && !Or(); ) fh(Gt);
  }
  function fh(n) {
    var r = hh(n.alternate, n, Br);
    n.memoizedProps = n.pendingProps, r === null ? dh(n) : Gt = r, Hc.current = null;
  }
  function dh(n) {
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
          kn = 6, Gt = null;
          return;
        }
      } else if (l = Uy(l, r, Br), l !== null) {
        Gt = l;
        return;
      }
      if (r = r.sibling, r !== null) {
        Gt = r;
        return;
      }
      Gt = r = n;
    } while (r !== null);
    kn === 0 && (kn = 5);
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
    if (dy(n, d), n === sn && (Gt = sn = null, _n = 0), !(l.subtreeFlags & 2064) && !(l.flags & 2064) || Ku || (Ku = !0, mh(Xa, function() {
      return Ju(), null;
    })), d = (l.flags & 15990) !== 0, l.subtreeFlags & 15990 || d) {
      d = wa.transition, wa.transition = null;
      var m = Mt;
      Mt = 1;
      var C = ct;
      ct |= 4, Hc.current = null, Ay(n, l), uh(l, n), qs(kl), xl = !!ld, kl = ld = null, n.current = l, Fy(l), Bi(), ct = C, Mt = m, wa.transition = d;
    } else n.current = l;
    if (Ku && (Ku = !1, Da = n, Bc = c), d = n.pendingLanes, d === 0 && (ba = null), Xp(l.stateNode), On(n, kt()), r !== null) for (o = n.onRecoverableError, l = 0; l < r.length; l++) c = r[l], o(c.value, { componentStack: c.stack, digest: c.digest });
    if (jc) throw jc = !1, n = Ud, Ud = null, n;
    return Bc & 1 && n.tag !== 0 && Ju(), d = n.pendingLanes, d & 1 ? n === Pc ? ls++ : (ls = 0, Pc = n) : ls = 0, Nr(), null;
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
              var C = d.deletions;
              if (C !== null) {
                for (var w = 0; w < C.length; w++) {
                  var F = C[w];
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
                      if (ih(W), W === F) {
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
              var k = d.sibling;
              if (k !== null) {
                k.return = d.return, ge = k;
                break e;
              }
              ge = d.return;
            }
          }
          var D = n.current;
          for (ge = D; ge !== null; ) {
            m = ge;
            var N = m.child;
            if (m.subtreeFlags & 2064 && N !== null) N.return = m, ge = N;
            else e: for (m = D; ge !== null; ) {
              if (C = ge, C.flags & 2048) try {
                switch (C.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Ac(9, C);
                }
              } catch (_e) {
                cn(C, C.return, _e);
              }
              if (C === m) {
                ge = null;
                break e;
              }
              var J = C.sibling;
              if (J !== null) {
                J.return = C.return, ge = J;
                break e;
              }
              ge = C.return;
            }
          }
          if (ct = c, Nr(), Ha && typeof Ha.onPostCommitFiberRoot == "function") try {
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
  function ph(n, r, l) {
    r = el(l, r), r = Zv(n, r, 1), n = Zi(n, r, 1), r = Yn(), n !== null && (Rl(n, 1, r), On(n, r));
  }
  function cn(n, r, l) {
    if (n.tag === 3) ph(n, n, l);
    else for (; r !== null; ) {
      if (r.tag === 3) {
        ph(r, n, l);
        break;
      } else if (r.tag === 1) {
        var o = r.stateNode;
        if (typeof r.type.getDerivedStateFromError == "function" || typeof o.componentDidCatch == "function" && (ba === null || !ba.has(o))) {
          n = el(l, n), n = Jv(r, n, 1), r = Zi(r, n, 1), n = Yn(), r !== null && (Rl(r, 1, n), On(r, n));
          break;
        }
      }
      r = r.return;
    }
  }
  function Py(n, r, l) {
    var o = n.pingCache;
    o !== null && o.delete(r), r = Yn(), n.pingedLanes |= n.suspendedLanes & l, sn === n && (_n & l) === l && (kn === 4 || kn === 3 && (_n & 130023424) === _n && 500 > kt() - Vc ? Wl(n, 0) : Nd |= l), On(n, r);
  }
  function vh(n, r) {
    r === 0 && (n.mode & 1 ? (r = pu, pu <<= 1, !(pu & 130023424) && (pu = 4194304)) : r = 1);
    var l = Yn();
    n = Ti(n, r), n !== null && (Rl(n, r, l), On(n, l));
  }
  function Hd(n) {
    var r = n.memoizedState, l = 0;
    r !== null && (l = r.retryLane), vh(n, l);
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
    o !== null && o.delete(r), vh(n, l);
  }
  var hh;
  hh = function(n, r, l) {
    if (n !== null) if (n.memoizedProps !== r.pendingProps || un.current) Vr = !0;
    else {
      if (!(n.lanes & l) && !(r.flags & 128)) return Vr = !1, xi(n, r, l);
      Vr = !!(n.flags & 131072);
    }
    else Vr = !1, Wt && r.flags & 1048576 && pd(r, wu, r.index);
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
          switch (rs(n, r), n = r.pendingProps, c = o._init, o = c(o._payload), r.type = o, c = r.tag = Yy(o), n = Hr(o, n), c) {
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
              r = tl(null, r, o, Hr(o.type, n), l);
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
        return o = r.type, c = r.pendingProps, c = r.elementType === o ? c : Hr(o, c), tt(n, r, o, c, l);
      case 1:
        return o = r.type, c = r.pendingProps, c = r.elementType === o ? c : Hr(o, c), ts(n, r, o, c, l);
      case 3:
        e: {
          if (Ny(r), n === null) throw Error(y(387));
          o = r.pendingProps, d = r.memoizedState, c = d.element, _u(n, r), cc(r, o, null, l);
          var m = r.memoizedState;
          if (o = m.element, d.isDehydrated) if (d = { element: o, isDehydrated: !1, cache: m.cache, pendingSuspenseBoundaries: m.pendingSuspenseBoundaries, transitions: m.transitions }, r.updateQueue.baseState = d, r.memoizedState = d, r.flags & 256) {
            c = el(Error(y(423)), r), r = nh(n, r, o, l, c);
            break e;
          } else if (o !== c) {
            c = el(Error(y(424)), r), r = nh(n, r, o, l, c);
            break e;
          } else for (Ar = $a(r.stateNode.containerInfo.firstChild), Jr = r, Wt = !0, Ea = null, l = Pv(r, null, o, l), r.child = l; l; ) l.flags = l.flags & -3 | 4096, l = l.sibling;
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
        return Qv(r), n === null && ac(r), o = r.type, c = r.pendingProps, d = n !== null ? n.memoizedProps : null, m = c.children, Bo(o, c) ? m = null : d !== null && Bo(o, d) && (r.flags |= 32), Bl(n, r), vn(n, r, m, l), r.child;
      case 6:
        return n === null && ac(r), null;
      case 13:
        return rh(n, r, l);
      case 4:
        return Sd(r, r.stateNode.containerInfo), o = r.pendingProps, n === null ? r.child = bu(r, null, o, l) : vn(n, r, o, l), r.child;
      case 11:
        return o = r.type, c = r.pendingProps, c = r.elementType === o ? c : Hr(o, c), Hu(n, r, o, c, l);
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
            var C = d.dependencies;
            if (C !== null) {
              m = d.child;
              for (var w = C.firstContext; w !== null; ) {
                if (w.context === o) {
                  if (d.tag === 1) {
                    w = Fr(-1, l & -l), w.tag = 2;
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
                  ), C.lanes |= l;
                  break;
                }
                w = w.next;
              }
            } else if (d.tag === 10) m = d.type === r.type ? null : d.child;
            else if (d.tag === 18) {
              if (m = d.return, m === null) throw Error(y(341));
              m.lanes |= l, C = m.alternate, C !== null && (C.lanes |= l), gd(m, l, r), m = d.sibling;
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
        return o = r.type, c = Hr(o, r.pendingProps), c = Hr(o.type, c), tl(n, r, o, c, l);
      case 15:
        return kc(n, r, r.type, r.pendingProps, l);
      case 17:
        return o = r.type, c = r.pendingProps, c = r.elementType === o ? c : Hr(o, c), rs(n, r), r.tag = 1, Xt(o) ? (n = !0, tc(r)) : n = !1, Du(r, l), qv(r, o, c), xd(r, o, c, l), Oc(null, r, o, !0, n, l);
      case 19:
        return _d(n, r, l);
      case 22:
        return jr(n, r, l);
    }
    throw Error(y(156, r.tag));
  };
  function mh(n, r) {
    return It(n, r);
  }
  function yh(n, r, l, o) {
    this.tag = n, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = r, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = o, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function _a(n, r, l, o) {
    return new yh(n, r, l, o);
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
      case oe:
        return n = _a(13, l, r, c), n.elementType = oe, n.lanes = d, n;
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
  function jd(n, r, l, o, c, d, m, C, w) {
    return n = new cs(n, r, l, C, w), r === 1 ? (r = 1, d === !0 && (r |= 8)) : r = 0, d = _a(3, null, null, r), n.current = d, d.stateNode = n, d.memoizedState = { element: o, isDehydrated: l, cache: null, transitions: null, pendingSuspenseBoundaries: null }, oc(d), n;
  }
  function gh(n, r, l) {
    var o = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: Ct, key: o == null ? null : "" + o, children: n, containerInfo: r, implementation: l };
  }
  function Bd(n) {
    if (!n) return Za;
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
  function Pd(n, r, l, o, c, d, m, C, w) {
    return n = jd(l, o, !0, n, c, d, m, C, w), n.context = Bd(null), l = n.current, o = Yn(), c = bi(l), d = Fr(o, c), d.callback = r ?? null, Zi(l, d, c), n.current.lanes = c, Rl(n, c, o), On(n, o), n;
  }
  function qc(n, r, l, o) {
    var c = r.current, d = Yn(), m = bi(c);
    return l = Bd(l), r.context === null ? r.context = l : r.pendingContext = l, r = Fr(d, m), r.payload = { element: n }, o = o === void 0 ? null : o, o !== null && (r.callback = o), n = Zi(c, r, m), n !== null && (rn(n, c, m, d), sc(n, c, m)), m;
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
  function Sh(n, r) {
    if (n = n.memoizedState, n !== null && n.dehydrated !== null) {
      var l = n.retryLane;
      n.retryLane = l !== 0 && l < r ? l : r;
    }
  }
  function $d(n, r) {
    Sh(n, r), (n = n.alternate) && Sh(n, r);
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
      ri(function() {
        qc(null, n, null, null);
      }), r[Si] = null;
    }
  };
  function ds(n) {
    this._internalRoot = n;
  }
  ds.prototype.unstable_scheduleHydration = function(n) {
    if (n) {
      var r = ev();
      n = { blockedOn: null, target: n, priority: r };
      for (var l = 0; l < zt.length && r !== 0 && r < zt[l].priority; l++) ;
      zt.splice(l, 0, n), l === 0 && tv(n);
    }
  };
  function il(n) {
    return !(!n || n.nodeType !== 1 && n.nodeType !== 9 && n.nodeType !== 11);
  }
  function Kc(n) {
    return !(!n || n.nodeType !== 1 && n.nodeType !== 9 && n.nodeType !== 11 && (n.nodeType !== 8 || n.nodeValue !== " react-mount-point-unstable "));
  }
  function Eh() {
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
      var m = Pd(r, o, n, 0, null, !1, !1, "", Eh);
      return n._reactRootContainer = m, n[Si] = m.current, Ru(n.nodeType === 8 ? n.parentNode : n), ri(), m;
    }
    for (; c = n.lastChild; ) n.removeChild(c);
    if (typeof o == "function") {
      var C = o;
      o = function() {
        var F = fs(w);
        C.call(F);
      };
    }
    var w = jd(n, 0, !1, null, null, !1, !1, "", Eh);
    return n._reactRootContainer = w, n[Si] = w.current, Ru(n.nodeType === 8 ? n.parentNode : n), ri(function() {
      qc(r, w, l, o);
    }), w;
  }
  function Zc(n, r, l, o, c) {
    var d = l._reactRootContainer;
    if (d) {
      var m = d;
      if (typeof c == "function") {
        var C = c;
        c = function() {
          var w = fs(m);
          C.call(w);
        };
      }
      qc(r, m, n, c);
    } else m = Qy(l, r, n, c, o);
    return fs(m);
  }
  Jp = function(n) {
    switch (n.tag) {
      case 3:
        var r = n.stateNode;
        if (r.current.memoizedState.isDehydrated) {
          var l = Tl(r.pendingLanes);
          l !== 0 && (Ro(r, l | 1), On(r, kt()), !(ct & 6) && (Xu = kt() + 500, Nr()));
        }
        break;
      case 13:
        ri(function() {
          var o = Ti(n, 1);
          if (o !== null) {
            var c = Yn();
            rn(o, n, 1, c);
          }
        }), $d(n, 1);
    }
  }, Fs = function(n) {
    if (n.tag === 13) {
      var r = Ti(n, 134217728);
      if (r !== null) {
        var l = Yn();
        rn(r, n, 134217728, l);
      }
      $d(n, 134217728);
    }
  }, Nt = function(n) {
    if (n.tag === 13) {
      var r = bi(n), l = Ti(n, r);
      if (l !== null) {
        var o = Yn();
        rn(l, n, r, o);
      }
      $d(n, r);
    }
  }, ev = function() {
    return Mt;
  }, Hf = function(n, r) {
    var l = Mt;
    try {
      return Mt = n, r();
    } finally {
      Mt = l;
    }
  }, Wr = function(n, r, l) {
    switch (r) {
      case "input":
        if (qn(n, l), r = l.name, l.type === "radio" && r != null) {
          for (l = n; l.parentNode; ) l = l.parentNode;
          for (l = l.querySelectorAll("input[name=" + JSON.stringify("" + r) + '][type="radio"]'), r = 0; r < l.length; r++) {
            var o = l[r];
            if (o !== n && o.form === n.form) {
              var c = He(o);
              if (!c) throw Error(y(90));
              _r(o), qn(o, c);
            }
          }
        }
        break;
      case "textarea":
        Se(n, l);
        break;
      case "select":
        r = l.value, r != null && te(n, !!l.multiple, r, !1);
    }
  }, Co = Fd, Ns = ri;
  var Wy = { usingClientEntryPoint: !1, Events: [$o, xu, He, gl, cu, Fd] }, ps = { findFiberByHostInstance: ma, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, Ch = { bundleType: ps.bundleType, version: ps.version, rendererPackageName: ps.rendererPackageName, rendererConfig: ps.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ot.ReactCurrentDispatcher, findHostInstanceByFiber: function(n) {
    return n = it(n), n === null ? null : n.stateNode;
  }, findFiberByHostInstance: ps.findFiberByHostInstance || Iy, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Jc = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Jc.isDisabled && Jc.supportsFiber) try {
      To = Jc.inject(Ch), Ha = Jc;
    } catch {
    }
  }
  return Ua.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Wy, Ua.createPortal = function(n, r) {
    var l = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!il(r)) throw Error(y(200));
    return gh(n, r, null, l);
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
    return ri(n);
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
    return n._reactRootContainer ? (ri(function() {
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
var HT;
function ek() {
  return HT || (HT = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var h = hr, T = ZT(), y = h.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, A = !1;
    function Y(e) {
      A = e;
    }
    function z(e) {
      if (!A) {
        for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
          a[i - 1] = arguments[i];
        pe("warn", e, a);
      }
    }
    function S(e) {
      if (!A) {
        for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
          a[i - 1] = arguments[i];
        pe("error", e, a);
      }
    }
    function pe(e, t, a) {
      {
        var i = y.ReactDebugCurrentFrame, u = i.getStackAddendum();
        u !== "" && (t += "%s", a = a.concat([u]));
        var s = a.map(function(f) {
          return String(f);
        });
        s.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, s);
      }
    }
    var se = 0, ce = 1, Me = 2, $ = 3, ue = 4, re = 5, xe = 6, Ze = 7, Ge = 8, wt = 9, Ee = 10, Ie = 11, ot = 12, Ne = 13, Ct = 14, Xe = 15, Yt = 16, Jt = 17, pt = 18, Et = 19, Ve = 21, oe = 22, Fe = 23, vt = 24, st = 25, Ut = !0, ee = !1, ke = !1, fe = !1, ht = !1, gt = !0, xn = !1, Un = !0, ca = !0, en = !0, mr = !0, gn = /* @__PURE__ */ new Set(), Wn = {}, fa = {};
    function Gn(e, t) {
      _r(e, t), _r(e + "Capture", t);
    }
    function _r(e, t) {
      Wn[e] && S("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), Wn[e] = t;
      {
        var a = e.toLowerCase();
        fa[a] = e, e === "onDoubleClick" && (fa.ondblclick = e);
      }
      for (var i = 0; i < t.length; i++)
        gn.add(t[i]);
    }
    var fn = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", wn = Object.prototype.hasOwnProperty;
    function zn(e) {
      {
        var t = typeof Symbol == "function" && Symbol.toStringTag, a = t && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return a;
      }
    }
    function An(e) {
      try {
        return qn(e), !1;
      } catch {
        return !0;
      }
    }
    function qn(e) {
      return "" + e;
    }
    function x(e, t) {
      if (An(e))
        return S("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", t, zn(e)), qn(e);
    }
    function M(e) {
      if (An(e))
        return S("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", zn(e)), qn(e);
    }
    function V(e, t) {
      if (An(e))
        return S("The provided `%s` prop is an unsupported type %s. This value must be coerced to a string before before using it here.", t, zn(e)), qn(e);
    }
    function te(e, t) {
      if (An(e))
        return S("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", t, zn(e)), qn(e);
    }
    function Z(e) {
      if (An(e))
        return S("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", zn(e)), qn(e);
    }
    function q(e) {
      if (An(e))
        return S("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before before using it here.", zn(e)), qn(e);
    }
    var Se = 0, Je = 1, _t = 2, at = 3, dn = 4, Ga = 5, yr = 6, ne = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", Ue = ne + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", rt = new RegExp("^[" + ne + "][" + Ue + "]*$"), bt = {}, jt = {};
    function Fn(e) {
      return wn.call(jt, e) ? !0 : wn.call(bt, e) ? !1 : rt.test(e) ? (jt[e] = !0, !0) : (bt[e] = !0, S("Invalid attribute name: `%s`", e), !1);
    }
    function pn(e, t, a) {
      return t !== null ? t.type === Se : a ? !1 : e.length > 2 && (e[0] === "o" || e[0] === "O") && (e[1] === "n" || e[1] === "N");
    }
    function kr(e, t, a, i) {
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
      if (t === null || typeof t > "u" || kr(e, t, a, i))
        return !0;
      if (i)
        return !1;
      if (a !== null)
        switch (a.type) {
          case at:
            return !t;
          case dn:
            return t === !1;
          case Ga:
            return isNaN(t);
          case yr:
            return isNaN(t) || t < 1;
        }
      return !1;
    }
    function Wr(e) {
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
        yr,
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
        Ga,
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
        if (!Fn(t))
          return;
        if (!e.hasAttribute(t))
          return a === void 0 ? void 0 : null;
        var u = e.getAttribute(t);
        return x(a, t), u === "" + a ? a : u;
      }
    }
    function qa(e, t, a, i) {
      var u = Wr(t);
      if (!pn(t, u, i)) {
        if (Bt(t, a, u, i) && (a = null), i || u === null) {
          if (Fn(t)) {
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
    var di = Symbol.for("react.element"), Gr = Symbol.for("react.portal"), Fa = Symbol.for("react.fragment"), ji = Symbol.for("react.strict_mode"), Cl = Symbol.for("react.profiler"), R = Symbol.for("react.provider"), G = Symbol.for("react.context"), ae = Symbol.for("react.forward_ref"), ze = Symbol.for("react.suspense"), dt = Symbol.for("react.suspense_list"), St = Symbol.for("react.memo"), $e = Symbol.for("react.lazy"), it = Symbol.for("react.scope"), Hn = Symbol.for("react.debug_trace_mode"), It = Symbol.for("react.offscreen"), tn = Symbol.for("react.legacy_hidden"), Or = Symbol.for("react.cache"), Bi = Symbol.for("react.tracing_marker"), kt = Symbol.iterator, or = "@@iterator";
    function qr(e) {
      if (e === null || typeof e != "object")
        return null;
      var t = kt && e[kt] || e[or];
      return typeof t == "function" ? t : null;
    }
    var lt = Object.assign, Xa = 0, qp, Nf, To, Ha, Xp, da, Kp;
    function Zp() {
    }
    Zp.__reactDisabledLog = !0;
    function fy() {
      {
        if (Xa === 0) {
          qp = console.log, Nf = console.info, To = console.warn, Ha = console.error, Xp = console.group, da = console.groupCollapsed, Kp = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: Zp,
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
        Xa++;
      }
    }
    function Us() {
      {
        if (Xa--, Xa === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: lt({}, e, {
              value: qp
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
              value: Xp
            }),
            groupCollapsed: lt({}, e, {
              value: da
            }),
            groupEnd: lt({}, e, {
              value: Kp
            })
          });
        }
        Xa < 0 && S("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
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
      var b = e ? e.displayName || e.name : "", U = b ? Va(b) : "";
      return typeof e == "function" && zs.set(e, U), U;
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
          case ae:
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
        case re:
          return Va(e.type);
        case Yt:
          return Va("Lazy");
        case Ne:
          return Va("Suspense");
        case Et:
          return Va("SuspenseList");
        case se:
        case Me:
        case Xe:
          return Rl(e.type);
        case Ie:
          return Rl(e.type.render);
        case ce:
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
    function Jp(e, t, a) {
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
        case Gr:
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
          case ae:
            return Jp(e, e.render, "ForwardRef");
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
    function ev(e, t, a) {
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
          return ev(a, a.render, "ForwardRef");
        case Ze:
          return "Fragment";
        case re:
          return a;
        case ue:
          return "Portal";
        case $:
          return "Root";
        case xe:
          return "Text";
        case Yt:
          return Nt(a);
        case Ge:
          return a === ji ? "StrictMode" : "Mode";
        case oe:
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
        case ce:
        case se:
        case Jt:
        case Me:
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
    function bn() {
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
    function sr(e) {
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
    var tv = {
      button: !0,
      checkbox: !0,
      image: !0,
      hidden: !0,
      radio: !0,
      reset: !0,
      submit: !0
    };
    function vu(e, t) {
      tv[t.type] || t.onChange || t.onInput || t.readOnly || t.disabled || t.value == null || S("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), t.onChange || t.readOnly || t.disabled || t.checked == null || S("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
    }
    function Vf(e) {
      var t = e.type, a = e.nodeName;
      return a && a.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
    }
    function nv(e) {
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
      nv(e) || (e._valueTracker = hu(e));
    }
    function rv(e) {
      if (!e)
        return !1;
      var t = nv(e);
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
      i != null && qa(a, "checked", i, !1);
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
        a.value != u) && (a.value = sr(u)) : a.value !== sr(u) && (a.value = sr(u));
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
        var f = sr(i._wrapperState.initialValue);
        a || f !== i.value && (i.value = f), i.defaultValue = f;
      }
      var p = i.name;
      p !== "" && (i.name = ""), i.defaultChecked = !i.defaultChecked, i.defaultChecked = !!i._wrapperState.initialChecked, p !== "" && (i.name = p);
    }
    function av(e, t) {
      var a = e;
      mu(a, t), Xr(a, t);
    }
    function Xr(e, t) {
      var a = t.name;
      if (t.type === "radio" && a != null) {
        for (var i = e; i.parentNode; )
          i = i.parentNode;
        x(a, "name");
        for (var u = i.querySelectorAll("input[name=" + JSON.stringify("" + a) + '][type="radio"]'), s = 0; s < u.length; s++) {
          var f = u[s];
          if (!(f === e || f.form !== e.form)) {
            var p = Hh(f);
            if (!p)
              throw new Error("ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.");
            rv(f), mu(f, p);
          }
        }
      }
    }
    function $i(e, t, a) {
      // Focused number inputs synchronize on blur. See ChangeEventPlugin.js
      (t !== "number" || Hs(e.ownerDocument) !== e) && (a == null ? e.defaultValue = sr(e._wrapperState.initialValue) : e.defaultValue !== sr(a) && (e.defaultValue = sr(a)));
    }
    var Bs = !1, yu = !1, iv = !1;
    function Ps(e, t) {
      t.value == null && (typeof t.children == "object" && t.children !== null ? h.Children.forEach(t.children, function(a) {
        a != null && (typeof a == "string" || typeof a == "number" || yu || (yu = !0, S("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
      }) : t.dangerouslySetInnerHTML != null && (iv || (iv = !0, S("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.")))), t.selected != null && !Bs && (S("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), Bs = !0);
    }
    function Pf(e, t) {
      t.value != null && e.setAttribute("value", sr(Pi(t.value)));
    }
    var Mo = Array.isArray;
    function Vn(e) {
      return Mo(e);
    }
    var $s;
    $s = !1;
    function lv() {
      var e = va();
      return e ? `

Check the render method of \`` + e + "`." : "";
    }
    var uv = ["value", "defaultValue"];
    function vy(e) {
      {
        vu("select", e);
        for (var t = 0; t < uv.length; t++) {
          var a = uv[t];
          if (e[a] != null) {
            var i = Vn(e[a]);
            e.multiple && !i ? S("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", a, lv()) : !e.multiple && i && S("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", a, lv());
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
        for (var E = sr(Pi(a)), _ = null, b = 0; b < u.length; b++) {
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
    function ov(e, t) {
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
        children: sr(a._wrapperState.initialValue)
      });
      return i;
    }
    function sv(e, t) {
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
            if (Vn(u)) {
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
    function cv(e, t) {
      var a = e, i = Pi(t.value), u = Pi(t.defaultValue);
      if (i != null) {
        var s = sr(i);
        s !== a.value && (a.value = s), t.defaultValue == null && a.defaultValue !== s && (a.defaultValue = s);
      }
      u != null && (a.defaultValue = sr(u));
    }
    function fv(e, t) {
      var a = e, i = a.textContent;
      i === a._wrapperState.initialValue && i !== "" && i !== null && (a.value = i);
    }
    function Qf(e, t) {
      cv(e, t);
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
    }, Is, dv = Sy(function(e, t) {
      if (e.namespaceURI === Wf && !("innerHTML" in e)) {
        Is = Is || document.createElement("div"), Is.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>";
        for (var a = Is.firstChild; e.firstChild; )
          e.removeChild(e.firstChild);
        for (; a.firstChild; )
          e.appendChild(a.firstChild);
        return;
      }
      e.innerHTML = t;
    }), Lr = 1, hi = 3, En = 8, Ba = 9, wl = 11, Qs = function(e, t) {
      if (t) {
        var a = e.firstChild;
        if (a && a === e.lastChild && a.nodeType === hi) {
          a.nodeValue = t;
          return;
        }
      }
      e.textContent = t;
    }, pv = {
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
    function vv(e, t) {
      return e + t.charAt(0).toUpperCase() + t.substring(1);
    }
    var hv = ["Webkit", "ms", "Moz", "O"];
    Object.keys(gu).forEach(function(e) {
      hv.forEach(function(t) {
        gu[vv(t, e)] = gu[e];
      });
    });
    function Ws(e, t, a) {
      var i = t == null || typeof t == "boolean" || t === "";
      return i ? "" : !a && typeof t == "number" && t !== 0 && !(gu.hasOwnProperty(e) && gu[e]) ? t + "px" : (te(t, e), ("" + t).trim());
    }
    var Su = /([A-Z])/g, Ey = /^ms-/;
    function Cy(e) {
      return e.replace(Su, "-$1").toLowerCase().replace(Ey, "-ms-");
    }
    var mv = function() {
    };
    {
      var yv = /^(?:webkit|moz|o)[A-Z]/, gv = /^-ms-/, No = /-(.)/g, Eu = /;\s*$/, Cu = {}, Tu = {}, Sv = !1, qf = !1, Xf = function(e) {
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
          Xf(e.replace(gv, "ms-"))
        ));
      }, Ev = function(e) {
        Cu.hasOwnProperty(e) && Cu[e] || (Cu[e] = !0, S("Unsupported vendor-prefixed style property %s. Did you mean %s?", e, e.charAt(0).toUpperCase() + e.slice(1)));
      }, Cv = function(e, t) {
        Tu.hasOwnProperty(t) && Tu[t] || (Tu[t] = !0, S(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, e, t.replace(Eu, "")));
      }, Tv = function(e, t) {
        Sv || (Sv = !0, S("`NaN` is an invalid value for the `%s` css style property.", e));
      }, Ty = function(e, t) {
        qf || (qf = !0, S("`Infinity` is an invalid value for the `%s` css style property.", e));
      };
      mv = function(e, t) {
        e.indexOf("-") > -1 ? Kf(e) : yv.test(e) ? Ev(e) : Eu.test(t) && Cv(e, t), typeof t == "number" && (isNaN(t) ? Tv(e, t) : isFinite(t) || Ty(e, t));
      };
    }
    var Ry = mv;
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
    function Rv(e, t) {
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
        for (var i = pv[a] || [a], u = 0; u < i.length; u++)
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
    var xv = {
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
    }, wv = lt({
      menuitem: !0
    }, xv), bv = "__html";
    function Gs(e, t) {
      if (t) {
        if (wv[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
          throw new Error(e + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
        if (t.dangerouslySetInnerHTML != null) {
          if (t.children != null)
            throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
          if (typeof t.dangerouslySetInnerHTML != "object" || !(bv in t.dangerouslySetInnerHTML))
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
    }, Dv = {
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
        if (wn.call(Pa, t) && Pa[t])
          return !0;
        if (zo.test(t)) {
          var a = "aria-" + t.slice(4).toLowerCase(), i = Dv.hasOwnProperty(a) ? a : null;
          if (i == null)
            return S("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", t), Pa[t] = !0, !0;
          if (t !== i)
            return S("Invalid ARIA attribute `%s`. Did you mean `%s`?", t, i), Pa[t] = !0, !0;
        }
        if (Zf.test(t)) {
          var u = t.toLowerCase(), s = Dv.hasOwnProperty(u) ? u : null;
          if (s == null)
            return Pa[t] = !0, !1;
          if (t !== s)
            return S("Unknown ARIA attribute `%s`. Did you mean `%s`?", t, s), Pa[t] = !0, !0;
        }
      }
      return !0;
    }
    function _v(e, t) {
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
      mi(e, t) || _v(e, t);
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
      var jn = {}, nd = /^on./, kv = /^on[^A-Z]/, Ov = new RegExp("^(aria)-[" + Ue + "]*$"), Lv = new RegExp("^(aria)[A-Z][" + Ue + "]*$");
      td = function(e, t, a, i) {
        if (wn.call(jn, t) && jn[t])
          return !0;
        var u = t.toLowerCase();
        if (u === "onfocusin" || u === "onfocusout")
          return S("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), jn[t] = !0, !0;
        if (i != null) {
          var s = i.registrationNameDependencies, f = i.possibleRegistrationNames;
          if (s.hasOwnProperty(t))
            return !0;
          var p = f.hasOwnProperty(u) ? f[u] : null;
          if (p != null)
            return S("Invalid event handler property `%s`. Did you mean `%s`?", t, p), jn[t] = !0, !0;
          if (nd.test(t))
            return S("Unknown event handler property `%s`. It will be ignored.", t), jn[t] = !0, !0;
        } else if (nd.test(t))
          return kv.test(t) && S("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", t), jn[t] = !0, !0;
        if (Ov.test(t) || Lv.test(t))
          return !0;
        if (u === "innerhtml")
          return S("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), jn[t] = !0, !0;
        if (u === "aria")
          return S("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), jn[t] = !0, !0;
        if (u === "is" && a !== null && a !== void 0 && typeof a != "string")
          return S("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof a), jn[t] = !0, !0;
        if (typeof a == "number" && isNaN(a))
          return S("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", t), jn[t] = !0, !0;
        var v = Wr(t), g = v !== null && v.type === Se;
        if (qs.hasOwnProperty(u)) {
          var E = qs[u];
          if (E !== t)
            return S("Invalid DOM property `%s`. Did you mean `%s`?", t, E), jn[t] = !0, !0;
        } else if (!g && t !== u)
          return S("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", t, u), jn[t] = !0, !0;
        return typeof a == "boolean" && kr(t, a, v, !1) ? (a ? S('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', a, t, t, a, t) : S('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', a, t, t, a, t, t, t), jn[t] = !0, !0) : g ? !0 : kr(t, a, v, !1) ? (jn[t] = !0, !1) : ((a === "false" || a === "true") && v !== null && v.type === at && (S("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", a, t, a === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', t, a), jn[t] = !0), !0);
      };
    }
    var Mv = function(e, t, a) {
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
    function Nv(e, t, a) {
      mi(e, t) || Mv(e, t, a);
    }
    var yi = 1, Ao = 2, Dl = 4, by = yi | Ao | Dl, Fo = null;
    function Ho(e) {
      Fo !== null && S("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."), Fo = e;
    }
    function Dy() {
      Fo === null && S("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."), Fo = null;
    }
    function Uv(e) {
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
          var i = Hh(a);
          Vt(t.stateNode, t.type, i);
        }
      }
    }
    function zv(e) {
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
      var i = Hh(a);
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
    function Av(e, t, a, i, u, s, f, p, v) {
      var g = Array.prototype.slice.call(arguments, 3);
      try {
        t.apply(a, g);
      } catch (E) {
        this.onError(E);
      }
    }
    var ud = Av;
    if (typeof window < "u" && typeof window.dispatchEvent == "function" && typeof document < "u" && typeof document.createEvent == "function") {
      var od = document.createElement("react");
      ud = function(t, a, i, u, s, f, p, v, g) {
        if (typeof document > "u" || document === null)
          throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");
        var E = document.createEvent("Event"), _ = !1, b = !0, U = window.event, H = Object.getOwnPropertyDescriptor(window, "event");
        function j() {
          od.removeEventListener(B, je, !1), typeof window.event < "u" && window.hasOwnProperty("event") && (window.event = U);
        }
        var de = Array.prototype.slice.call(arguments, 3);
        function je() {
          _ = !0, j(), a.apply(i, de), b = !1;
        }
        var Le, yt = !1, ft = !1;
        function O(L) {
          if (Le = L.error, yt = !0, Le === null && L.colno === 0 && L.lineno === 0 && (ft = !0), L.defaultPrevented && Le != null && typeof Le == "object")
            try {
              Le._suppressLogging = !0;
            } catch {
            }
        }
        var B = "react-" + (t || "invokeguardedcallback");
        if (window.addEventListener("error", O), od.addEventListener(B, je, !1), E.initEvent(B, !1, !1), od.dispatchEvent(E), H && Object.defineProperty(window, "event", H), _ && b && (yt ? ft && (Le = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")) : Le = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`), this.onError(Le)), window.removeEventListener("error", O), !_)
          return j(), Av.apply(this, arguments);
      };
    }
    var ky = ud, Qi = !1, $a = null, Po = !1, Wi = null, Ka = {
      onError: function(e) {
        Qi = !0, $a = e;
      }
    };
    function Ll(e, t, a, i, u, s, f, p, v) {
      Qi = !1, $a = null, ky.apply(Ka, arguments);
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
    ), Za = (
      /*                     */
      64
    ), Qe = (
      /*                   */
      128
    ), un = (
      /*            */
      256
    ), Mr = (
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
    ), tc = Xt | nt | Za | Mr | ya | Yo, Fv = (
      /*               */
      32767
    ), Kr = (
      /*                   */
      32768
    ), Bn = (
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
    ), Nr = (
      /*                 */
      4194304
    ), Xi = (
      /*                */
      8388608
    ), Ur = (
      /*               */
      16777216
    ), Ml = (
      /*              */
      33554432
    ), wu = (
      // TODO: Remove Update flag from before mutation phase by re-landing Visibility
      // flag logic (see #20043)
      nt | ya | 0
    ), zr = Qt | nt | Dt | Ot | Mr | ga | qi, cr = nt | Za | Mr | qi, Sa = Xt | Dt, Xn = Nr | Xi | dd, Ei = y.ReactCurrentOwner;
    function Zr(e) {
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
      return t.tag === $ ? a : null;
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
      return e.tag === $ ? e.stateNode.containerInfo : null;
    }
    function vd(e) {
      return Zr(e) === e;
    }
    function Jr(e) {
      {
        var t = Ei.current;
        if (t !== null && t.tag === ce) {
          var a = t, i = a.stateNode;
          i._warnedAboutRefsInRender || S("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", et(a) || "A component"), i._warnedAboutRefsInRender = !0;
        }
      }
      var u = ma(e);
      return u ? Zr(u) === u : !1;
    }
    function Ar(e) {
      if (Zr(e) !== e)
        throw new Error("Unable to find node on an unmounted component.");
    }
    function Wt(e) {
      var t = e.alternate;
      if (!t) {
        var a = Zr(e);
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
              return Ar(s), e;
            if (v === u)
              return Ar(s), t;
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
      if (i.tag !== $)
        throw new Error("Unable to find node on an unmounted component.");
      return i.stateNode.current === i ? e : t;
    }
    function Ea(e) {
      var t = Wt(e);
      return t !== null ? hd(t) : null;
    }
    function hd(e) {
      if (e.tag === re || e.tag === xe)
        return e;
      for (var t = e.child; t !== null; ) {
        var a = hd(t);
        if (a !== null)
          return a;
        t = t.sibling;
      }
      return null;
    }
    function Hv(e) {
      var t = Wt(e);
      return t !== null ? rc(t) : null;
    }
    function rc(e) {
      if (e.tag === re || e.tag === xe)
        return e;
      for (var t = e.child; t !== null; ) {
        if (t.tag !== ue) {
          var a = rc(t);
          if (a !== null)
            return a;
        }
        t = t.sibling;
      }
      return null;
    }
    var ac = T.unstable_scheduleCallback, Vv = T.unstable_cancelCallback, ic = T.unstable_shouldYield, jv = T.unstable_requestPaint, nn = T.unstable_now, md = T.unstable_getCurrentPriorityLevel, lc = T.unstable_ImmediatePriority, Nl = T.unstable_UserBlockingPriority, Ja = T.unstable_NormalPriority, Bv = T.unstable_LowPriority, uc = T.unstable_IdlePriority, bu = T.unstable_yieldValue, Pv = T.unstable_setDisableYieldValue, Ci = null, Dn = null, ie = null, Ca = !1, ea = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u";
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
          injectProfilingHooks: $v
        })), Ci = t.inject(e), Dn = t;
      } catch (a) {
        S("React instrumentation encountered an error: %s.", a);
      }
      return !!t.checkDCE;
    }
    function gd(e, t) {
      if (Dn && typeof Dn.onScheduleFiberRoot == "function")
        try {
          Dn.onScheduleFiberRoot(Ci, e, t);
        } catch (a) {
          Ca || (Ca = !0, S("React instrumentation encountered an error: %s", a));
        }
    }
    function Du(e, t) {
      if (Dn && typeof Dn.onCommitFiberRoot == "function")
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
              case ei:
                i = Ja;
                break;
              case Vu:
                i = uc;
                break;
              default:
                i = Ja;
                break;
            }
            Dn.onCommitFiberRoot(Ci, e, i, a);
          }
        } catch (u) {
          Ca || (Ca = !0, S("React instrumentation encountered an error: %s", u));
        }
    }
    function Ta(e) {
      if (Dn && typeof Dn.onPostCommitFiberRoot == "function")
        try {
          Dn.onPostCommitFiberRoot(Ci, e);
        } catch (t) {
          Ca || (Ca = !0, S("React instrumentation encountered an error: %s", t));
        }
    }
    function Ul(e) {
      if (Dn && typeof Dn.onCommitFiberUnmount == "function")
        try {
          Dn.onCommitFiberUnmount(Ci, e);
        } catch (t) {
          Ca || (Ca = !0, S("React instrumentation encountered an error: %s", t));
        }
    }
    function Cn(e) {
      if (typeof bu == "function" && (Pv(e), Y(e)), Dn && typeof Dn.setStrictMode == "function")
        try {
          Dn.setStrictMode(Ci, e);
        } catch (t) {
          Ca || (Ca = !0, S("React instrumentation encountered an error: %s", t));
        }
    }
    function $v(e) {
      ie = e;
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
      ie !== null && typeof ie.markCommitStarted == "function" && ie.markCommitStarted(e);
    }
    function oc() {
      ie !== null && typeof ie.markCommitStopped == "function" && ie.markCommitStopped();
    }
    function _u(e) {
      ie !== null && typeof ie.markComponentRenderStarted == "function" && ie.markComponentRenderStarted(e);
    }
    function Fr() {
      ie !== null && typeof ie.markComponentRenderStopped == "function" && ie.markComponentRenderStopped();
    }
    function Zi(e) {
      ie !== null && typeof ie.markComponentPassiveEffectMountStarted == "function" && ie.markComponentPassiveEffectMountStarted(e);
    }
    function sc() {
      ie !== null && typeof ie.markComponentPassiveEffectMountStopped == "function" && ie.markComponentPassiveEffectMountStopped();
    }
    function Yv(e) {
      ie !== null && typeof ie.markComponentPassiveEffectUnmountStarted == "function" && ie.markComponentPassiveEffectUnmountStarted(e);
    }
    function cc() {
      ie !== null && typeof ie.markComponentPassiveEffectUnmountStopped == "function" && ie.markComponentPassiveEffectUnmountStopped();
    }
    function Iv(e) {
      ie !== null && typeof ie.markComponentLayoutEffectMountStarted == "function" && ie.markComponentLayoutEffectMountStarted(e);
    }
    function Qo() {
      ie !== null && typeof ie.markComponentLayoutEffectMountStopped == "function" && ie.markComponentLayoutEffectMountStopped();
    }
    function Ya(e) {
      ie !== null && typeof ie.markComponentLayoutEffectUnmountStarted == "function" && ie.markComponentLayoutEffectUnmountStarted(e);
    }
    function ku() {
      ie !== null && typeof ie.markComponentLayoutEffectUnmountStopped == "function" && ie.markComponentLayoutEffectUnmountStopped();
    }
    function Wo(e, t, a) {
      ie !== null && typeof ie.markComponentErrored == "function" && ie.markComponentErrored(e, t, a);
    }
    function zl(e, t, a) {
      ie !== null && typeof ie.markComponentSuspended == "function" && ie.markComponentSuspended(e, t, a);
    }
    function Sd(e) {
      ie !== null && typeof ie.markLayoutEffectsStarted == "function" && ie.markLayoutEffectsStarted(e);
    }
    function Ou() {
      ie !== null && typeof ie.markLayoutEffectsStopped == "function" && ie.markLayoutEffectsStopped();
    }
    function Qv(e) {
      ie !== null && typeof ie.markPassiveEffectsStarted == "function" && ie.markPassiveEffectsStarted(e);
    }
    function Ed() {
      ie !== null && typeof ie.markPassiveEffectsStopped == "function" && ie.markPassiveEffectsStopped();
    }
    function Kt(e) {
      ie !== null && typeof ie.markRenderStarted == "function" && ie.markRenderStarted(e);
    }
    function fc() {
      ie !== null && typeof ie.markRenderYielded == "function" && ie.markRenderYielded();
    }
    function dc() {
      ie !== null && typeof ie.markRenderStopped == "function" && ie.markRenderStopped();
    }
    function Cd(e) {
      ie !== null && typeof ie.markRenderScheduled == "function" && ie.markRenderScheduled(e);
    }
    function pc(e, t) {
      ie !== null && typeof ie.markForceUpdateScheduled == "function" && ie.markForceUpdateScheduled(e, t);
    }
    function Go(e, t) {
      ie !== null && typeof ie.markStateUpdateScheduled == "function" && ie.markStateUpdateScheduled(e, t);
    }
    var De = (
      /*                         */
      0
    ), Oe = (
      /*                 */
      1
    ), We = (
      /*                    */
      2
    ), ut = (
      /*               */
      8
    ), ta = (
      /*              */
      16
    ), Lu = Math.clz32 ? Math.clz32 : fr, qo = Math.log, Ly = Math.LN2;
    function fr(e) {
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
    ), Kn = (
      /*    */
      2
    ), na = (
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
    ), Wv = Hl, Zo = (
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
    ), dr = (
      /*                   */
      1073741824
    );
    function My(e) {
      {
        if (e & Ae)
          return "Sync";
        if (e & Kn)
          return "InputContinuousHydration";
        if (e & na)
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
        if (e & dr)
          return "Offscreen";
      }
    }
    var $t = -1, _c = Nu, Hr = Hl;
    function Vl(e) {
      switch (vn(e)) {
        case Ae:
          return Ae;
        case Kn:
          return Kn;
        case na:
          return na;
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
        case dr:
          return dr;
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
      (i & na) !== I && (i |= a & Ra);
      var b = e.entangledLanes;
      if (b !== I)
        for (var U = e.entanglements, H = i & b; H > 0; ) {
          var j = tl(H), de = 1 << j;
          i |= U[j], H &= ~de;
        }
      return i;
    }
    function Gv(e, t) {
      for (var a = e.eventTimes, i = $t; t > 0; ) {
        var u = tl(t), s = 1 << u, f = a[u];
        f > i && (i = f), t &= ~s;
      }
      return i;
    }
    function qv(e, t) {
      switch (e) {
        case Ae:
        case Kn:
        case na:
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
        case dr:
          return $t;
        default:
          return S("Should have found matching lanes. This is a bug in React."), $t;
      }
    }
    function Xv(e, t) {
      for (var a = e.pendingLanes, i = e.suspendedLanes, u = e.pingedLanes, s = e.expirationTimes, f = a; f > 0; ) {
        var p = tl(f), v = 1 << p, g = s[p];
        g === $t ? ((v & i) === I || (v & u) !== I) && (s[p] = qv(v, t)) : g <= t && (e.expiredLanes |= v), f &= ~v;
      }
    }
    function xd(e) {
      return Vl(e.pendingLanes);
    }
    function el(e) {
      var t = e.pendingLanes & ~dr;
      return t !== I ? t : t & dr ? dr : I;
    }
    function wd(e) {
      return (e & Ae) !== I;
    }
    function Jo(e) {
      return (e & Rd) !== I;
    }
    function Kv(e) {
      return (e & Au) === e;
    }
    function Zv(e) {
      var t = Ae | na | Ra;
      return (e & t) === I;
    }
    function Jv(e) {
      return (e & Al) === e;
    }
    function es(e, t) {
      var a = Kn | na | Ri | Ra;
      return (t & a) !== I;
    }
    function eh(e, t) {
      return (t & e.expiredLanes) !== I;
    }
    function bd(e) {
      return (e & Al) !== I;
    }
    function th() {
      var e = _c;
      return _c <<= 1, (_c & Al) === I && (_c = Nu), e;
    }
    function Vr() {
      var e = Hr;
      return Hr <<= 1, (Hr & Au) === I && (Hr = Hl), e;
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
    function jr(e, t) {
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
    function nh(e, t) {
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
    function rh(e, t) {
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
    function ah(e, t) {
      var a = vn(t), i;
      switch (a) {
        case na:
          i = Kn;
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
      if (ea)
        for (var i = e.pendingUpdatersLaneMap; a > 0; ) {
          var u = kc(a), s = 1 << u, f = i[u];
          f.add(t), a &= ~s;
        }
    }
    function _d(e, t) {
      if (ea)
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
    var hn = Ae, xi = na, ei = Ra, Vu = Ji, ju = Tn;
    function xa() {
      return ju;
    }
    function on(e) {
      ju = e;
    }
    function pr(e, t) {
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
    function Zn(e) {
      var t = vn(e);
      return Bu(hn, t) ? Bu(xi, t) ? Jo(t) ? ei : Vu : xi : hn;
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
    function ih(e) {
      Fc = e;
    }
    var Od;
    function lh(e) {
      Od = e;
    }
    var as = !1, Yu = [], Zt = null, Pn = null, gr = null, Iu = /* @__PURE__ */ new Map(), Qu = /* @__PURE__ */ new Map(), $n = [], uh = [
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
    function ti(e) {
      return uh.indexOf(e) > -1;
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
          Pn = null;
          break;
        case "mouseover":
        case "mouseout":
          gr = null;
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
    function oh(e, t, a, i, u) {
      switch (t) {
        case "focusin": {
          var s = u;
          return Zt = Wu(Zt, e, t, a, i, s), !0;
        }
        case "dragenter": {
          var f = u;
          return Pn = Wu(Pn, e, t, a, i, f), !0;
        }
        case "mouseover": {
          var p = u;
          return gr = Wu(gr, e, t, a, i, p), !0;
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
        var a = Zr(t);
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
          } else if (i === $) {
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
      }, i = 0; i < $n.length && Bu(t, $n[i].priority); i++)
        ;
      $n.splice(i, 0, a), i === 0 && Md(a);
    }
    function $l(e) {
      if (e.blockedOn !== null)
        return !1;
      for (var t = e.targetContainers; t.length > 0; ) {
        var a = t[0], i = vr(e.domEventName, e.eventSystemFlags, a, e.nativeEvent);
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
      as = !1, Zt !== null && $l(Zt) && (Zt = null), Pn !== null && $l(Pn) && (Pn = null), gr !== null && $l(gr) && (gr = null), Iu.forEach(Hc), Qu.forEach(Hc);
    }
    function ct(e, t) {
      e.blockedOn === t && (e.blockedOn = null, as || (as = !0, T.unstable_scheduleCallback(T.unstable_NormalPriority, wa)));
    }
    function sn(e) {
      if (Yu.length > 0) {
        ct(Yu[0], e);
        for (var t = 1; t < Yu.length; t++) {
          var a = Yu[t];
          a.blockedOn === e && (a.blockedOn = null);
        }
      }
      Zt !== null && ct(Zt, e), Pn !== null && ct(Pn, e), gr !== null && ct(gr, e);
      var i = function(p) {
        return ct(p, e);
      };
      Iu.forEach(i), Qu.forEach(i);
      for (var u = 0; u < $n.length; u++) {
        var s = $n[u];
        s.blockedOn === e && (s.blockedOn = null);
      }
      for (; $n.length > 0; ) {
        var f = $n[0];
        if (f.blockedOn !== null)
          break;
        Md(f), f.blockedOn === null && $n.shift();
      }
    }
    var Gt = y.ReactCurrentBatchConfig, _n = !0;
    function Br(e) {
      _n = !!e;
    }
    function Gu() {
      return _n;
    }
    function kn(e, t, a) {
      var i = Vc(t), u;
      switch (i) {
        case hn:
          u = is;
          break;
        case xi:
          u = Yl;
          break;
        case ei:
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
      _n && Nd(e, t, a, i);
    }
    function Nd(e, t, a, i) {
      var u = vr(e, t, a, i);
      if (u === null) {
        tg(e, t, i, nl, a), Ld(e, i);
        return;
      }
      if (oh(u, e, t, a, i)) {
        i.stopPropagation();
        return;
      }
      if (Ld(e, i), t & Dl && ti(e)) {
        for (; u !== null; ) {
          var s = no(u);
          s !== null && kd(s);
          var f = vr(e, t, a, i);
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
    function vr(e, t, a, i) {
      nl = null;
      var u = Ks(i), s = ms(u);
      if (s !== null) {
        var f = Zr(s);
        if (f === null)
          s = null;
        else {
          var p = f.tag;
          if (p === Ne) {
            var v = pd(f);
            if (v !== null)
              return v;
            s = null;
          } else if (p === $) {
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
            case Ja:
            case Bv:
              return ei;
            case uc:
              return Vu;
            default:
              return ei;
          }
        }
        default:
          return ei;
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
    function Yn() {
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
        return g ? this.isDefaultPrevented = Yn : this.isDefaultPrevented = bi, this.isPropagationStopped = bi, this;
      }
      return lt(t.prototype, {
        preventDefault: function() {
          this.defaultPrevented = !0;
          var a = this.nativeEvent;
          a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), this.isDefaultPrevented = Yn);
        },
        stopPropagation: function() {
          var a = this.nativeEvent;
          a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = Yn);
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
        isPersistent: Yn
      }), t;
    }
    var On = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function(e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0
    }, $c = rn(On), Ql = lt({}, On, {
      view: 0,
      detail: 0
    }), zd = rn(Ql), Ad, ni, Zu;
    function Fd(e) {
      e !== Zu && (Zu && e.type === "mousemove" ? (Ad = e.screenX - Zu.screenX, ni = e.screenY - Zu.screenY) : (Ad = 0, ni = 0), Zu = e);
    }
    var ri = lt({}, Ql, {
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
        return "movementY" in e ? e.movementY : ni;
      }
    }), Yc = rn(ri), Wl = lt({}, ri, {
      dataTransfer: 0
    }), sh = rn(Wl), ch = lt({}, Ql, {
      relatedTarget: 0
    }), os = rn(ch), Ic = lt({}, On, {
      animationName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), Vy = rn(Ic), jy = lt({}, On, {
      clipboardData: function(e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      }
    }), fh = rn(jy), dh = lt({}, On, {
      data: 0
    }), rl = rn(dh), By = rl, Ju = {
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
    }, ph = {
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
      return e.type === "keydown" || e.type === "keyup" ? ph[e.keyCode] || "Unidentified" : "";
    }
    var Py = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey"
    };
    function vh(e) {
      var t = this, a = t.nativeEvent;
      if (a.getModifierState)
        return a.getModifierState(e);
      var i = Py[e];
      return i ? !!a[i] : !1;
    }
    function Hd(e) {
      return vh;
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
    }), hh = rn($y), mh = lt({}, ri, {
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
    }), yh = rn(mh), _a = lt({}, Ql, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Hd
    }), Vd = rn(_a), Yy = lt({}, On, {
      propertyName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), al = rn(Yy), Qc = lt({}, ri, {
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
    var jd = fn && "TextEvent" in window && !cs, gh = fn && (!ss || cs && cs > 8 && cs <= 11), Bd = 32, Pd = String.fromCharCode(Bd);
    function qc() {
      Gn("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), Gn("onCompositionEnd", ["compositionend", "focusout", "keydown", "keypress", "keyup", "mousedown"]), Gn("onCompositionStart", ["compositionstart", "focusout", "keydown", "keypress", "keyup", "mousedown"]), Gn("onCompositionUpdate", ["compositionupdate", "focusout", "keydown", "keypress", "keyup", "mousedown"]);
    }
    var fs = !1;
    function Sh(e) {
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
      gh && !ds(i) && (!il && s === "onCompositionStart" ? il = Bc(u) : s === "onCompositionEnd" && il && (f = Pc()));
      var p = wh(a, s);
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
    function Eh(e, t) {
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
          if (!Sh(t)) {
            if (t.char && t.char.length > 1)
              return t.char;
            if (t.which)
              return String.fromCharCode(t.which);
          }
          return null;
        case "compositionend":
          return gh && !ds(t) ? null : t.data;
        default:
          return null;
      }
    }
    function Zc(e, t, a, i, u) {
      var s;
      if (jd ? s = Eh(t, i) : s = Qy(t, i), !s)
        return null;
      var f = wh(a, "onBeforeInput");
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
    function Ch(e) {
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
      Gn("onChange", ["change", "click", "focusin", "focusout", "input", "keydown", "keyup", "selectionchange"]);
    }
    function r(e, t, a, i) {
      Zs(i);
      var u = wh(t, "onChange");
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
      fE(e, 0);
    }
    function C(e) {
      var t = lf(e);
      if (rv(t))
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
      e.propertyName === "value" && C(o) && d(e);
    }
    function he(e, t, a) {
      e === "focusin" ? (X(), W(t, a)) : e === "focusout" && X();
    }
    function Ce(e, t) {
      if (e === "selectionchange" || e === "keyup" || e === "keydown")
        return C(o);
    }
    function we(e) {
      var t = e.nodeName;
      return t && t.toLowerCase() === "input" && (e.type === "checkbox" || e.type === "radio");
    }
    function mn(e, t) {
      if (e === "click")
        return C(t);
    }
    function k(e, t) {
      if (e === "input" || e === "change")
        return C(t);
    }
    function D(e) {
      var t = e._wrapperState;
      !t || !t.controlled || e.type !== "number" || $i(e, "number", e.value);
    }
    function N(e, t, a, i, u, s, f) {
      var p = a ? lf(a) : window, v, g;
      if (c(p) ? v = w : Ch(p) ? F ? v = k : (v = Ce, g = he) : we(p) && (v = mn), v) {
        var E = v(t, a);
        if (E) {
          r(e, E, i, u);
          return;
        }
      }
      g && g(t, p, a), t === "focusout" && D(p);
    }
    function J() {
      _r("onMouseEnter", ["mouseout", "mouseover"]), _r("onMouseLeave", ["mouseout", "mouseover"]), _r("onPointerEnter", ["pointerout", "pointerover"]), _r("onPointerLeave", ["pointerout", "pointerover"]);
    }
    function _e(e, t, a, i, u, s, f) {
      var p = t === "mouseover" || t === "pointerover", v = t === "mouseout" || t === "pointerout";
      if (p && !Uv(i)) {
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
        var b, U;
        if (v) {
          var H = i.relatedTarget || i.toElement;
          if (b = a, U = H ? ms(H) : null, U !== null) {
            var j = Zr(U);
            (U !== j || U.tag !== re && U.tag !== xe) && (U = null);
          }
        } else
          b = null, U = a;
        if (b !== U) {
          var de = Yc, je = "onMouseLeave", Le = "onMouseEnter", yt = "mouse";
          (t === "pointerout" || t === "pointerover") && (de = yh, je = "onPointerLeave", Le = "onPointerEnter", yt = "pointer");
          var ft = b == null ? E : lf(b), O = U == null ? E : lf(U), B = new de(je, yt + "leave", b, i, u);
          B.target = ft, B.relatedTarget = O;
          var L = null, K = ms(u);
          if (K === a) {
            var ye = new de(Le, yt + "enter", U, i, u);
            ye.target = O, ye.relatedTarget = ft, L = ye;
          }
          kR(e, B, L, b, U);
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
        if (!wn.call(t, s) || !Te(e[s], t[s]))
          return !1;
      }
      return !0;
    }
    function Ln(e) {
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
      for (var a = Ln(e), i = 0, u = 0; a; ) {
        if (a.nodeType === hi) {
          if (u = i + a.textContent.length, i <= t && u >= t)
            return {
              node: a,
              offset: t - i
            };
          i = u;
        }
        a = Ln(Tt(a));
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
      return sR(e, u, s, f, p);
    }
    function sR(e, t, a, i, u) {
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
    function cR(e, t) {
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
    function J0(e) {
      return e && e.nodeType === hi;
    }
    function eE(e, t) {
      return !e || !t ? !1 : e === t ? !0 : J0(e) ? !1 : J0(t) ? eE(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1;
    }
    function fR(e) {
      return e && e.ownerDocument && eE(e.ownerDocument.documentElement, e);
    }
    function dR(e) {
      try {
        return typeof e.contentWindow.location.href == "string";
      } catch {
        return !1;
      }
    }
    function tE() {
      for (var e = window, t = Hs(); t instanceof e.HTMLIFrameElement; ) {
        if (dR(t))
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
    function pR() {
      var e = tE();
      return {
        focusedElem: e,
        selectionRange: qy(e) ? hR(e) : null
      };
    }
    function vR(e) {
      var t = tE(), a = e.focusedElem, i = e.selectionRange;
      if (t !== a && fR(a)) {
        i !== null && qy(a) && mR(a, i);
        for (var u = [], s = a; s = s.parentNode; )
          s.nodeType === Lr && u.push({
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
    function hR(e) {
      var t;
      return "selectionStart" in e ? t = {
        start: e.selectionStart,
        end: e.selectionEnd
      } : t = Gy(e), t || {
        start: 0,
        end: 0
      };
    }
    function mR(e, t) {
      var a = t.start, i = t.end;
      i === void 0 && (i = a), "selectionStart" in e ? (e.selectionStart = a, e.selectionEnd = Math.min(i, e.value.length)) : cR(e, t);
    }
    var yR = fn && "documentMode" in document && document.documentMode <= 11;
    function gR() {
      Gn("onSelect", ["focusout", "contextmenu", "dragend", "focusin", "keydown", "keyup", "mousedown", "mouseup", "selectionchange"]);
    }
    var ef = null, Xy = null, Id = null, Ky = !1;
    function SR(e) {
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
    function ER(e) {
      return e.window === e ? e.document : e.nodeType === Ba ? e : e.ownerDocument;
    }
    function nE(e, t, a) {
      var i = ER(a);
      if (!(Ky || ef == null || ef !== Hs(i))) {
        var u = SR(ef);
        if (!Id || !Pe(Id, u)) {
          Id = u;
          var s = wh(Xy, "onSelect");
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
    function CR(e, t, a, i, u, s, f) {
      var p = a ? lf(a) : window;
      switch (t) {
        case "focusin":
          (Ch(p) || p.contentEditable === "true") && (ef = p, Xy = a, Id = null);
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
          Ky = !1, nE(e, i, u);
          break;
        case "selectionchange":
          if (yR)
            break;
        case "keydown":
        case "keyup":
          nE(e, i, u);
      }
    }
    function Th(e, t) {
      var a = {};
      return a[e.toLowerCase()] = t.toLowerCase(), a["Webkit" + e] = "webkit" + t, a["Moz" + e] = "moz" + t, a;
    }
    var tf = {
      animationend: Th("Animation", "AnimationEnd"),
      animationiteration: Th("Animation", "AnimationIteration"),
      animationstart: Th("Animation", "AnimationStart"),
      transitionend: Th("Transition", "TransitionEnd")
    }, Zy = {}, rE = {};
    fn && (rE = document.createElement("div").style, "AnimationEvent" in window || (delete tf.animationend.animation, delete tf.animationiteration.animation, delete tf.animationstart.animation), "TransitionEvent" in window || delete tf.transitionend.transition);
    function Rh(e) {
      if (Zy[e])
        return Zy[e];
      if (!tf[e])
        return e;
      var t = tf[e];
      for (var a in t)
        if (t.hasOwnProperty(a) && a in rE)
          return Zy[e] = t[a];
      return e;
    }
    var aE = Rh("animationend"), iE = Rh("animationiteration"), lE = Rh("animationstart"), uE = Rh("transitionend"), oE = /* @__PURE__ */ new Map(), sE = ["abort", "auxClick", "cancel", "canPlay", "canPlayThrough", "click", "close", "contextMenu", "copy", "cut", "drag", "dragEnd", "dragEnter", "dragExit", "dragLeave", "dragOver", "dragStart", "drop", "durationChange", "emptied", "encrypted", "ended", "error", "gotPointerCapture", "input", "invalid", "keyDown", "keyPress", "keyUp", "load", "loadedData", "loadedMetadata", "loadStart", "lostPointerCapture", "mouseDown", "mouseMove", "mouseOut", "mouseOver", "mouseUp", "paste", "pause", "play", "playing", "pointerCancel", "pointerDown", "pointerMove", "pointerOut", "pointerOver", "pointerUp", "progress", "rateChange", "reset", "resize", "seeked", "seeking", "stalled", "submit", "suspend", "timeUpdate", "touchCancel", "touchEnd", "touchStart", "volumeChange", "scroll", "toggle", "touchMove", "waiting", "wheel"];
    function eo(e, t) {
      oE.set(e, t), Gn(t, [e]);
    }
    function TR() {
      for (var e = 0; e < sE.length; e++) {
        var t = sE[e], a = t.toLowerCase(), i = t[0].toUpperCase() + t.slice(1);
        eo(a, "on" + i);
      }
      eo(aE, "onAnimationEnd"), eo(iE, "onAnimationIteration"), eo(lE, "onAnimationStart"), eo("dblclick", "onDoubleClick"), eo("focusin", "onFocus"), eo("focusout", "onBlur"), eo(uE, "onTransitionEnd");
    }
    function RR(e, t, a, i, u, s, f) {
      var p = oE.get(t);
      if (p !== void 0) {
        var v = $c, g = t;
        switch (t) {
          case "keypress":
            if (Il(i) === 0)
              return;
          case "keydown":
          case "keyup":
            v = hh;
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
            v = sh;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            v = Vd;
            break;
          case aE:
          case iE:
          case lE:
            v = Vy;
            break;
          case uE:
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
            v = fh;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            v = yh;
            break;
        }
        var E = (s & Dl) !== 0;
        {
          var _ = !E && // TODO: ideally, we'd eventually add all events from
          // nonDelegatedEvents list in DOMPluginEventSystem.
          // Then we can remove this special list.
          // This is a breaking change that can wait until React 18.
          t === "scroll", b = DR(a, p, i.type, E, _);
          if (b.length > 0) {
            var U = new v(p, g, null, i, u);
            e.push({
              event: U,
              listeners: b
            });
          }
        }
      }
    }
    TR(), J(), n(), gR(), qc();
    function xR(e, t, a, i, u, s, f) {
      RR(e, t, a, i, u, s);
      var p = (s & by) === 0;
      p && (_e(e, t, a, i, u), N(e, t, a, i, u), CR(e, t, a, i, u), Wy(e, t, a, i, u));
    }
    var Qd = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "encrypted", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "resize", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"], Jy = new Set(["cancel", "close", "invalid", "load", "scroll", "toggle"].concat(Qd));
    function cE(e, t, a) {
      var i = e.type || "unknown-event";
      e.currentTarget = a, Si(i, t, void 0, e), e.currentTarget = null;
    }
    function wR(e, t, a) {
      var i;
      if (a)
        for (var u = t.length - 1; u >= 0; u--) {
          var s = t[u], f = s.instance, p = s.currentTarget, v = s.listener;
          if (f !== i && e.isPropagationStopped())
            return;
          cE(e, v, p), i = f;
        }
      else
        for (var g = 0; g < t.length; g++) {
          var E = t[g], _ = E.instance, b = E.currentTarget, U = E.listener;
          if (_ !== i && e.isPropagationStopped())
            return;
          cE(e, U, b), i = _;
        }
    }
    function fE(e, t) {
      for (var a = (t & Dl) !== 0, i = 0; i < e.length; i++) {
        var u = e[i], s = u.event, f = u.listeners;
        wR(s, f, a);
      }
      sd();
    }
    function bR(e, t, a, i, u) {
      var s = Ks(a), f = [];
      xR(f, e, i, a, s, t), fE(f, t);
    }
    function an(e, t) {
      Jy.has(e) || S('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.', e);
      var a = !1, i = nw(t), u = OR(e);
      i.has(u) || (dE(t, e, Ao, a), i.add(u));
    }
    function eg(e, t, a) {
      Jy.has(e) && !t && S('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.', e);
      var i = 0;
      t && (i |= Dl), dE(a, e, i, t);
    }
    var xh = "_reactListening" + Math.random().toString(36).slice(2);
    function Wd(e) {
      if (!e[xh]) {
        e[xh] = !0, gn.forEach(function(a) {
          a !== "selectionchange" && (Jy.has(a) || eg(a, !1, e), eg(a, !0, e));
        });
        var t = e.nodeType === Ba ? e : e.ownerDocument;
        t !== null && (t[xh] || (t[xh] = !0, eg("selectionchange", !1, t)));
      }
    }
    function dE(e, t, a, i, u) {
      var s = kn(e, t, a), f = void 0;
      Bo && (t === "touchstart" || t === "touchmove" || t === "wheel") && (f = !0), e = e, i ? f !== void 0 ? jc(e, t, s, f) : wi(e, t, s) : f !== void 0 ? Ud(e, t, s, f) : Xu(e, t, s);
    }
    function pE(e, t) {
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
            if (v === $ || v === ue) {
              var g = p.stateNode.containerInfo;
              if (pE(g, f))
                break;
              if (v === ue)
                for (var E = p.return; E !== null; ) {
                  var _ = E.tag;
                  if (_ === $ || _ === ue) {
                    var b = E.stateNode.containerInfo;
                    if (pE(b, f))
                      return;
                  }
                  E = E.return;
                }
              for (; g !== null; ) {
                var U = ms(g);
                if (U === null)
                  return;
                var H = U.tag;
                if (H === re || H === xe) {
                  p = s = U;
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
        return bR(e, t, a, s);
      });
    }
    function Gd(e, t, a) {
      return {
        instance: e,
        listener: t,
        currentTarget: a
      };
    }
    function DR(e, t, a, i, u, s) {
      for (var f = t !== null ? t + "Capture" : null, p = i ? f : t, v = [], g = e, E = null; g !== null; ) {
        var _ = g, b = _.stateNode, U = _.tag;
        if (U === re && b !== null && (E = b, p !== null)) {
          var H = kl(g, p);
          H != null && v.push(Gd(g, H, E));
        }
        if (u)
          break;
        g = g.return;
      }
      return v;
    }
    function wh(e, t) {
      for (var a = t + "Capture", i = [], u = e; u !== null; ) {
        var s = u, f = s.stateNode, p = s.tag;
        if (p === re && f !== null) {
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
      while (e && e.tag !== re);
      return e || null;
    }
    function _R(e, t) {
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
    function vE(e, t, a, i, u) {
      for (var s = t._reactName, f = [], p = a; p !== null && p !== i; ) {
        var v = p, g = v.alternate, E = v.stateNode, _ = v.tag;
        if (g !== null && g === i)
          break;
        if (_ === re && E !== null) {
          var b = E;
          if (u) {
            var U = kl(p, s);
            U != null && f.unshift(Gd(p, U, b));
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
    function kR(e, t, a, i, u) {
      var s = i && u ? _R(i, u) : null;
      i !== null && vE(e, t, i, s, !1), u !== null && a !== null && vE(e, a, u, s, !0);
    }
    function OR(e, t) {
      return e + "__bubble";
    }
    var ka = !1, qd = "dangerouslySetInnerHTML", bh = "suppressContentEditableWarning", to = "suppressHydrationWarning", hE = "autoFocus", vs = "children", hs = "style", Dh = "__html", ng, _h, Xd, mE, kh, yE, gE;
    ng = {
      // There are working polyfills for <dialog>. Let people use it.
      dialog: !0,
      // Electron ships a custom <webview> tag to display external web content in
      // an isolated frame and process.
      // This tag is not present in non Electron environments such as JSDom which
      // is often used for testing purposes.
      // @see https://electronjs.org/docs/api/webview-tag
      webview: !0
    }, _h = function(e, t) {
      Xs(e, t), ed(e, t), Nv(e, t, {
        registrationNameDependencies: Wn,
        possibleRegistrationNames: fa
      });
    }, yE = fn && !document.documentMode, Xd = function(e, t, a) {
      if (!ka) {
        var i = Oh(a), u = Oh(t);
        u !== i && (ka = !0, S("Prop `%s` did not match. Server: %s Client: %s", e, JSON.stringify(u), JSON.stringify(i)));
      }
    }, mE = function(e) {
      if (!ka) {
        ka = !0;
        var t = [];
        e.forEach(function(a) {
          t.push(a);
        }), S("Extra attributes from the server: %s", t);
      }
    }, kh = function(e, t) {
      t === !1 ? S("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", e, e, e) : S("Expected `%s` listener to be a function, instead got a value of `%s` type.", e, typeof t);
    }, gE = function(e, t) {
      var a = e.namespaceURI === vi ? e.ownerDocument.createElement(e.tagName) : e.ownerDocument.createElementNS(e.namespaceURI, e.tagName);
      return a.innerHTML = t, a.innerHTML;
    };
    var LR = /\r\n?/g, MR = /\u0000|\uFFFD/g;
    function Oh(e) {
      Z(e);
      var t = typeof e == "string" ? e : "" + e;
      return t.replace(LR, `
`).replace(MR, "");
    }
    function Lh(e, t, a, i) {
      var u = Oh(t), s = Oh(e);
      if (s !== u && (i && (ka || (ka = !0, S('Text content did not match. Server: "%s" Client: "%s"', s, u))), a && Ut))
        throw new Error("Text content does not match server-rendered HTML.");
    }
    function SE(e) {
      return e.nodeType === Ba ? e : e.ownerDocument;
    }
    function NR() {
    }
    function Mh(e) {
      e.onclick = NR;
    }
    function UR(e, t, a, i, u) {
      for (var s in i)
        if (i.hasOwnProperty(s)) {
          var f = i[s];
          if (s === hs)
            f && Object.freeze(f), Rv(t, f);
          else if (s === qd) {
            var p = f ? f[Dh] : void 0;
            p != null && dv(t, p);
          } else if (s === vs)
            if (typeof f == "string") {
              var v = e !== "textarea" || f !== "";
              v && Qs(t, f);
            } else typeof f == "number" && Qs(t, "" + f);
          else s === bh || s === to || s === hE || (Wn.hasOwnProperty(s) ? f != null && (typeof f != "function" && kh(s, f), s === "onScroll" && an("scroll", t)) : f != null && qa(t, s, f, u));
        }
    }
    function zR(e, t, a, i) {
      for (var u = 0; u < t.length; u += 2) {
        var s = t[u], f = t[u + 1];
        s === hs ? Rv(e, f) : s === qd ? dv(e, f) : s === vs ? Qs(e, f) : qa(e, s, f, i);
      }
    }
    function AR(e, t, a, i) {
      var u, s = SE(a), f, p = i;
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
      return p === vi && !u && Object.prototype.toString.call(f) === "[object HTMLUnknownElement]" && !wn.call(ng, e) && (ng[e] = !0, S("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", e)), f;
    }
    function FR(e, t) {
      return SE(t).createTextNode(e);
    }
    function HR(e, t, a, i) {
      var u = mi(t, a);
      _h(t, a);
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
          ov(e, a), s = $f(e, a), an("invalid", e);
          break;
        case "textarea":
          sv(e, a), s = If(e, a), an("invalid", e);
          break;
        default:
          s = a;
      }
      switch (Gs(t, s), UR(t, e, i, s, u), t) {
        case "input":
          xl(e), Lo(e, a, !1);
          break;
        case "textarea":
          xl(e), fv(e);
          break;
        case "option":
          Pf(e, a);
          break;
        case "select":
          hy(e, a);
          break;
        default:
          typeof s.onClick == "function" && Mh(e);
          break;
      }
    }
    function VR(e, t, a, i, u) {
      _h(t, i);
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
          f = a, p = i, typeof f.onClick != "function" && typeof p.onClick == "function" && Mh(e);
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
          } else v === qd || v === vs || v === bh || v === to || v === hE || (Wn.hasOwnProperty(v) ? s || (s = []) : (s = s || []).push(v, null));
      for (v in p) {
        var b = p[v], U = f != null ? f[v] : void 0;
        if (!(!p.hasOwnProperty(v) || b === U || b == null && U == null))
          if (v === hs)
            if (b && Object.freeze(b), U) {
              for (g in U)
                U.hasOwnProperty(g) && (!b || !b.hasOwnProperty(g)) && (E || (E = {}), E[g] = "");
              for (g in b)
                b.hasOwnProperty(g) && U[g] !== b[g] && (E || (E = {}), E[g] = b[g]);
            } else
              E || (s || (s = []), s.push(v, E)), E = b;
          else if (v === qd) {
            var H = b ? b[Dh] : void 0, j = U ? U[Dh] : void 0;
            H != null && j !== H && (s = s || []).push(v, H);
          } else v === vs ? (typeof b == "string" || typeof b == "number") && (s = s || []).push(v, "" + b) : v === bh || v === to || (Wn.hasOwnProperty(v) ? (b != null && (typeof b != "function" && kh(v, b), v === "onScroll" && an("scroll", e)), !s && U !== b && (s = [])) : (s = s || []).push(v, b));
      }
      return E && (Uo(E, p[hs]), (s = s || []).push(hs, E)), s;
    }
    function jR(e, t, a, i, u) {
      a === "input" && u.type === "radio" && u.name != null && Bf(e, u);
      var s = mi(a, i), f = mi(a, u);
      switch (zR(e, t, s, f), a) {
        case "input":
          mu(e, u);
          break;
        case "textarea":
          cv(e, u);
          break;
        case "select":
          my(e, u);
          break;
      }
    }
    function BR(e) {
      {
        var t = e.toLowerCase();
        return qs.hasOwnProperty(t) && qs[t] || null;
      }
    }
    function PR(e, t, a, i, u, s, f) {
      var p, v;
      switch (p = mi(t, a), _h(t, a), t) {
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
          ov(e, a), an("invalid", e);
          break;
        case "textarea":
          sv(e, a), an("invalid", e);
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
      var U = null;
      for (var H in a)
        if (a.hasOwnProperty(H)) {
          var j = a[H];
          if (H === vs)
            typeof j == "string" ? e.textContent !== j && (a[to] !== !0 && Lh(e.textContent, j, s, f), U = [vs, j]) : typeof j == "number" && e.textContent !== "" + j && (a[to] !== !0 && Lh(e.textContent, j, s, f), U = [vs, "" + j]);
          else if (Wn.hasOwnProperty(H))
            j != null && (typeof j != "function" && kh(H, j), H === "onScroll" && an("scroll", e));
          else if (f && // Convince Flow we've calculated it (it's DEV-only in this method.)
          typeof p == "boolean") {
            var de = void 0, je = p && xn ? null : Wr(H);
            if (a[to] !== !0) {
              if (!(H === bh || H === to || // Controlled attributes are not validated
              // TODO: Only ignore them on controlled tags.
              H === "value" || H === "checked" || H === "selected")) {
                if (H === qd) {
                  var Le = e.innerHTML, yt = j ? j[Dh] : void 0;
                  if (yt != null) {
                    var ft = gE(e, yt);
                    ft !== Le && Xd(H, Le, ft);
                  }
                } else if (H === hs) {
                  if (v.delete(H), yE) {
                    var O = xy(j);
                    de = e.getAttribute("style"), O !== de && Xd(H, de, O);
                  }
                } else if (p && !xn)
                  v.delete(H.toLowerCase()), de = du(e, H, j), j !== de && Xd(H, de, j);
                else if (!pn(H, je, p) && !Bt(H, j, je, p)) {
                  var B = !1;
                  if (je !== null)
                    v.delete(je.attributeName), de = El(e, H, j, je);
                  else {
                    var L = i;
                    if (L === vi && (L = Ys(t)), L === vi)
                      v.delete(H.toLowerCase());
                    else {
                      var K = BR(H);
                      K !== null && K !== H && (B = !0, v.delete(K)), v.delete(H);
                    }
                    de = du(e, H, j);
                  }
                  var ye = xn;
                  !ye && j !== de && !B && Xd(H, de, j);
                }
              }
            }
          }
        }
      switch (f && // $FlowFixMe - Should be inferred as not undefined.
      v.size > 0 && a[to] !== !0 && mE(v), t) {
        case "input":
          xl(e), Lo(e, a, !0);
          break;
        case "textarea":
          xl(e), fv(e);
          break;
        case "select":
        case "option":
          break;
        default:
          typeof a.onClick == "function" && Mh(e);
          break;
      }
      return U;
    }
    function $R(e, t, a) {
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
    function YR(e, t, a) {
      switch (t) {
        case "input":
          av(e, a);
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
      var IR = ["address", "applet", "area", "article", "aside", "base", "basefont", "bgsound", "blockquote", "body", "br", "button", "caption", "center", "col", "colgroup", "dd", "details", "dir", "div", "dl", "dt", "embed", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "iframe", "img", "input", "isindex", "li", "link", "listing", "main", "marquee", "menu", "menuitem", "meta", "nav", "noembed", "noframes", "noscript", "object", "ol", "p", "param", "plaintext", "pre", "script", "section", "select", "source", "style", "summary", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "title", "tr", "track", "ul", "wbr", "xmp"], EE = [
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
      ], QR = EE.concat(["button"]), WR = ["dd", "dt", "li", "option", "optgroup", "p", "rp", "rt"], CE = {
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
        var a = lt({}, e || CE), i = {
          tag: t
        };
        return EE.indexOf(t) !== -1 && (a.aTagInScope = null, a.buttonTagInScope = null, a.nobrTagInScope = null), QR.indexOf(t) !== -1 && (a.pTagInButtonScope = null), IR.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (a.listItemTagAutoclosing = null, a.dlItemTagAutoclosing = null), a.current = i, t === "form" && (a.formTag = i), t === "a" && (a.aTagInScope = i), t === "button" && (a.buttonTagInScope = i), t === "nobr" && (a.nobrTagInScope = i), t === "p" && (a.pTagInButtonScope = i), t === "li" && (a.listItemTagAutoclosing = i), (t === "dd" || t === "dt") && (a.dlItemTagAutoclosing = i), a;
      };
      var GR = function(e, t) {
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
            return WR.indexOf(t) === -1;
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
      }, qR = function(e, t) {
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
      }, TE = {};
      Kd = function(e, t, a) {
        a = a || CE;
        var i = a.current, u = i && i.tag;
        t != null && (e != null && S("validateDOMNesting: when childText is passed, childTag should be null"), e = "#text");
        var s = GR(e, u) ? null : i, f = s ? null : qR(e, a), p = s || f;
        if (p) {
          var v = p.tag, g = !!s + "|" + e + "|" + v;
          if (!TE[g]) {
            TE[g] = !0;
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
    var Nh = "suppressHydrationWarning", Uh = "$", zh = "/$", Jd = "$?", ep = "$!", XR = "style", ug = null, og = null;
    function KR(e) {
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
    function ZR(e, t, a) {
      {
        var i = e, u = Gf(i.namespace, t), s = Zd(i.ancestorInfo, t);
        return {
          namespace: u,
          ancestorInfo: s
        };
      }
    }
    function Pk(e) {
      return e;
    }
    function JR(e) {
      ug = Gu(), og = pR();
      var t = null;
      return Br(!1), t;
    }
    function ex(e) {
      vR(og), Br(ug), ug = null, og = null;
    }
    function tx(e, t, a, i, u) {
      var s;
      {
        var f = i;
        if (Kd(e, null, f.ancestorInfo), typeof t.children == "string" || typeof t.children == "number") {
          var p = "" + t.children, v = Zd(f.ancestorInfo, e);
          Kd(null, p, v);
        }
        s = f.namespace;
      }
      var g = AR(e, t, a, s);
      return rp(u, g), mg(g, t), g;
    }
    function nx(e, t) {
      e.appendChild(t);
    }
    function rx(e, t, a, i, u) {
      switch (HR(e, t, a, i), t) {
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
    function ax(e, t, a, i, u, s) {
      {
        var f = s;
        if (typeof i.children != typeof a.children && (typeof i.children == "string" || typeof i.children == "number")) {
          var p = "" + i.children, v = Zd(f.ancestorInfo, t);
          Kd(null, p, v);
        }
      }
      return VR(e, t, a, i);
    }
    function sg(e, t) {
      return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
    }
    function ix(e, t, a, i) {
      {
        var u = a;
        Kd(null, e, u.ancestorInfo);
      }
      var s = FR(e, t);
      return rp(i, s), s;
    }
    function lx() {
      var e = window.event;
      return e === void 0 ? ei : Vc(e.type);
    }
    var cg = typeof setTimeout == "function" ? setTimeout : void 0, ux = typeof clearTimeout == "function" ? clearTimeout : void 0, fg = -1, RE = typeof Promise == "function" ? Promise : void 0, ox = typeof queueMicrotask == "function" ? queueMicrotask : typeof RE < "u" ? function(e) {
      return RE.resolve(null).then(e).catch(sx);
    } : cg;
    function sx(e) {
      setTimeout(function() {
        throw e;
      });
    }
    function cx(e, t, a, i) {
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
    function fx(e, t, a, i, u, s) {
      jR(e, t, a, i, u), mg(e, u);
    }
    function xE(e) {
      Qs(e, "");
    }
    function dx(e, t, a) {
      e.nodeValue = a;
    }
    function px(e, t) {
      e.appendChild(t);
    }
    function vx(e, t) {
      var a;
      e.nodeType === En ? (a = e.parentNode, a.insertBefore(t, e)) : (a = e, a.appendChild(t));
      var i = e._reactRootContainer;
      i == null && a.onclick === null && Mh(a);
    }
    function hx(e, t, a) {
      e.insertBefore(t, a);
    }
    function mx(e, t, a) {
      e.nodeType === En ? e.parentNode.insertBefore(t, a) : e.insertBefore(t, a);
    }
    function yx(e, t) {
      e.removeChild(t);
    }
    function gx(e, t) {
      e.nodeType === En ? e.parentNode.removeChild(t) : e.removeChild(t);
    }
    function dg(e, t) {
      var a = t, i = 0;
      do {
        var u = a.nextSibling;
        if (e.removeChild(a), u && u.nodeType === En) {
          var s = u.data;
          if (s === zh)
            if (i === 0) {
              e.removeChild(u), sn(t);
              return;
            } else
              i--;
          else (s === Uh || s === Jd || s === ep) && i++;
        }
        a = u;
      } while (a);
      sn(t);
    }
    function Sx(e, t) {
      e.nodeType === En ? dg(e.parentNode, t) : e.nodeType === Lr && dg(e, t), sn(e);
    }
    function Ex(e) {
      e = e;
      var t = e.style;
      typeof t.setProperty == "function" ? t.setProperty("display", "none", "important") : t.display = "none";
    }
    function Cx(e) {
      e.nodeValue = "";
    }
    function Tx(e, t) {
      e = e;
      var a = t[XR], i = a != null && a.hasOwnProperty("display") ? a.display : null;
      e.style.display = Ws("display", i);
    }
    function Rx(e, t) {
      e.nodeValue = t;
    }
    function xx(e) {
      e.nodeType === Lr ? e.textContent = "" : e.nodeType === Ba && e.documentElement && e.removeChild(e.documentElement);
    }
    function wx(e, t, a) {
      return e.nodeType !== Lr || t.toLowerCase() !== e.nodeName.toLowerCase() ? null : e;
    }
    function bx(e, t) {
      return t === "" || e.nodeType !== hi ? null : e;
    }
    function Dx(e) {
      return e.nodeType !== En ? null : e;
    }
    function wE(e) {
      return e.data === Jd;
    }
    function pg(e) {
      return e.data === ep;
    }
    function _x(e) {
      var t = e.nextSibling && e.nextSibling.dataset, a, i, u;
      return t && (a = t.dgst, i = t.msg, u = t.stck), {
        message: i,
        digest: a,
        stack: u
      };
    }
    function kx(e, t) {
      e._reactRetry = t;
    }
    function Ah(e) {
      for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === Lr || t === hi)
          break;
        if (t === En) {
          var a = e.data;
          if (a === Uh || a === ep || a === Jd)
            break;
          if (a === zh)
            return null;
        }
      }
      return e;
    }
    function tp(e) {
      return Ah(e.nextSibling);
    }
    function Ox(e) {
      return Ah(e.firstChild);
    }
    function Lx(e) {
      return Ah(e.firstChild);
    }
    function Mx(e) {
      return Ah(e.nextSibling);
    }
    function Nx(e, t, a, i, u, s, f) {
      rp(s, e), mg(e, a);
      var p;
      {
        var v = u;
        p = v.namespace;
      }
      var g = (s.mode & Oe) !== De;
      return PR(e, t, a, p, i, g, f);
    }
    function Ux(e, t, a, i) {
      return rp(a, e), a.mode & Oe, $R(e, t);
    }
    function zx(e, t) {
      rp(t, e);
    }
    function Ax(e) {
      for (var t = e.nextSibling, a = 0; t; ) {
        if (t.nodeType === En) {
          var i = t.data;
          if (i === zh) {
            if (a === 0)
              return tp(t);
            a--;
          } else (i === Uh || i === ep || i === Jd) && a++;
        }
        t = t.nextSibling;
      }
      return null;
    }
    function bE(e) {
      for (var t = e.previousSibling, a = 0; t; ) {
        if (t.nodeType === En) {
          var i = t.data;
          if (i === Uh || i === ep || i === Jd) {
            if (a === 0)
              return t;
            a--;
          } else i === zh && a++;
        }
        t = t.previousSibling;
      }
      return null;
    }
    function Fx(e) {
      sn(e);
    }
    function Hx(e) {
      sn(e);
    }
    function Vx(e) {
      return e !== "head" && e !== "body";
    }
    function jx(e, t, a, i) {
      var u = !0;
      Lh(t.nodeValue, a, i, u);
    }
    function Bx(e, t, a, i, u, s) {
      if (t[Nh] !== !0) {
        var f = !0;
        Lh(i.nodeValue, u, s, f);
      }
    }
    function Px(e, t) {
      t.nodeType === Lr ? rg(e, t) : t.nodeType === En || ag(e, t);
    }
    function $x(e, t) {
      {
        var a = e.parentNode;
        a !== null && (t.nodeType === Lr ? rg(a, t) : t.nodeType === En || ag(a, t));
      }
    }
    function Yx(e, t, a, i, u) {
      (u || t[Nh] !== !0) && (i.nodeType === Lr ? rg(a, i) : i.nodeType === En || ag(a, i));
    }
    function Ix(e, t, a) {
      ig(e, t);
    }
    function Qx(e, t) {
      lg(e, t);
    }
    function Wx(e, t, a) {
      {
        var i = e.parentNode;
        i !== null && ig(i, t);
      }
    }
    function Gx(e, t) {
      {
        var a = e.parentNode;
        a !== null && lg(a, t);
      }
    }
    function qx(e, t, a, i, u, s) {
      (s || t[Nh] !== !0) && ig(a, i);
    }
    function Xx(e, t, a, i, u) {
      (u || t[Nh] !== !0) && lg(a, i);
    }
    function Kx(e) {
      S("An error occurred during hydration. The server HTML was replaced with client content in <%s>.", e.nodeName.toLowerCase());
    }
    function Zx(e) {
      Wd(e);
    }
    var rf = Math.random().toString(36).slice(2), af = "__reactFiber$" + rf, vg = "__reactProps$" + rf, np = "__reactContainer$" + rf, hg = "__reactEvents$" + rf, Jx = "__reactListeners$" + rf, ew = "__reactHandles$" + rf;
    function tw(e) {
      delete e[af], delete e[vg], delete e[hg], delete e[Jx], delete e[ew];
    }
    function rp(e, t) {
      t[af] = e;
    }
    function Fh(e, t) {
      t[np] = e;
    }
    function DE(e) {
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
            for (var u = bE(e); u !== null; ) {
              var s = u[af];
              if (s)
                return s;
              u = bE(u);
            }
          return t;
        }
        e = a, a = e.parentNode;
      }
      return null;
    }
    function no(e) {
      var t = e[af] || e[np];
      return t && (t.tag === re || t.tag === xe || t.tag === Ne || t.tag === $) ? t : null;
    }
    function lf(e) {
      if (e.tag === re || e.tag === xe)
        return e.stateNode;
      throw new Error("getNodeFromInstance: Invalid argument.");
    }
    function Hh(e) {
      return e[vg] || null;
    }
    function mg(e, t) {
      e[vg] = t;
    }
    function nw(e) {
      var t = e[hg];
      return t === void 0 && (t = e[hg] = /* @__PURE__ */ new Set()), t;
    }
    var _E = {}, kE = y.ReactDebugCurrentFrame;
    function Vh(e) {
      if (e) {
        var t = e._owner, a = Ro(e.type, e._source, t ? t.type : null);
        kE.setExtraStackFrame(a);
      } else
        kE.setExtraStackFrame(null);
    }
    function _i(e, t, a, i, u) {
      {
        var s = Function.call.bind(wn);
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
            p && !(p instanceof Error) && (Vh(u), S("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", i || "React class", a, f, typeof p), Vh(null)), p instanceof Error && !(p.message in _E) && (_E[p.message] = !0, Vh(u), S("Failed %s type: %s", a, p.message), Vh(null));
          }
      }
    }
    var yg = [], jh;
    jh = [];
    var ql = -1;
    function ro(e) {
      return {
        current: e
      };
    }
    function Pr(e, t) {
      if (ql < 0) {
        S("Unexpected pop.");
        return;
      }
      t !== jh[ql] && S("Unexpected Fiber popped."), e.current = yg[ql], yg[ql] = null, jh[ql] = null, ql--;
    }
    function $r(e, t, a) {
      ql++, yg[ql] = e.current, jh[ql] = a, e.current = t;
    }
    var gg;
    gg = {};
    var Ia = {};
    Object.freeze(Ia);
    var Xl = ro(Ia), ll = ro(!1), Sg = Ia;
    function uf(e, t, a) {
      return a && ul(t) ? Sg : Xl.current;
    }
    function OE(e, t, a) {
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
        return u && OE(e, t, s), s;
      }
    }
    function Bh() {
      return ll.current;
    }
    function ul(e) {
      {
        var t = e.childContextTypes;
        return t != null;
      }
    }
    function Ph(e) {
      Pr(ll, e), Pr(Xl, e);
    }
    function Eg(e) {
      Pr(ll, e), Pr(Xl, e);
    }
    function LE(e, t, a) {
      {
        if (Xl.current !== Ia)
          throw new Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");
        $r(Xl, t, e), $r(ll, a, e);
      }
    }
    function ME(e, t, a) {
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
    function $h(e) {
      {
        var t = e.stateNode, a = t && t.__reactInternalMemoizedMergedChildContext || Ia;
        return Sg = Xl.current, $r(Xl, a, e), $r(ll, ll.current, e), !0;
      }
    }
    function NE(e, t, a) {
      {
        var i = e.stateNode;
        if (!i)
          throw new Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");
        if (a) {
          var u = ME(e, t, Sg);
          i.__reactInternalMemoizedMergedChildContext = u, Pr(ll, e), Pr(Xl, e), $r(Xl, u, e), $r(ll, a, e);
        } else
          Pr(ll, e), $r(ll, a, e);
      }
    }
    function rw(e) {
      {
        if (!vd(e) || e.tag !== ce)
          throw new Error("Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.");
        var t = e;
        do {
          switch (t.tag) {
            case $:
              return t.stateNode.context;
            case ce: {
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
    var ao = 0, Yh = 1, Kl = null, Cg = !1, Tg = !1;
    function UE(e) {
      Kl === null ? Kl = [e] : Kl.push(e);
    }
    function aw(e) {
      Cg = !0, UE(e);
    }
    function zE() {
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
    var sf = [], cf = 0, Ih = null, Qh = 0, ai = [], ii = 0, ys = null, Zl = 1, Jl = "";
    function iw(e) {
      return Ss(), (e.flags & fd) !== He;
    }
    function lw(e) {
      return Ss(), Qh;
    }
    function uw() {
      var e = Jl, t = Zl, a = t & ~ow(t);
      return a.toString(32) + e;
    }
    function gs(e, t) {
      Ss(), sf[cf++] = Qh, sf[cf++] = Ih, Ih = e, Qh = t;
    }
    function AE(e, t, a) {
      Ss(), ai[ii++] = Zl, ai[ii++] = Jl, ai[ii++] = ys, ys = e;
      var i = Zl, u = Jl, s = Wh(i) - 1, f = i & ~(1 << s), p = a + 1, v = Wh(t) + s;
      if (v > 30) {
        var g = s - s % 5, E = (1 << g) - 1, _ = (f & E).toString(32), b = f >> g, U = s - g, H = Wh(t) + U, j = p << U, de = j | b, je = _ + u;
        Zl = 1 << H | de, Jl = je;
      } else {
        var Le = p << s, yt = Le | f, ft = u;
        Zl = 1 << v | yt, Jl = ft;
      }
    }
    function Rg(e) {
      Ss();
      var t = e.return;
      if (t !== null) {
        var a = 1, i = 0;
        gs(e, a), AE(e, a, i);
      }
    }
    function Wh(e) {
      return 32 - Lu(e);
    }
    function ow(e) {
      return 1 << Wh(e) - 1;
    }
    function xg(e) {
      for (; e === Ih; )
        Ih = sf[--cf], sf[cf] = null, Qh = sf[--cf], sf[cf] = null;
      for (; e === ys; )
        ys = ai[--ii], ai[ii] = null, Jl = ai[--ii], ai[ii] = null, Zl = ai[--ii], ai[ii] = null;
    }
    function sw() {
      return Ss(), ys !== null ? {
        id: Zl,
        overflow: Jl
      } : null;
    }
    function cw(e, t) {
      Ss(), ai[ii++] = Zl, ai[ii++] = Jl, ai[ii++] = ys, Zl = t.id, Jl = t.overflow, ys = e;
    }
    function Ss() {
      Er() || S("Expected to be hydrating. This is a bug in React. Please file an issue.");
    }
    var Sr = null, li = null, ki = !1, Es = !1, lo = null;
    function fw() {
      ki && S("We should not be hydrating here. This is a bug in React. Please file a bug.");
    }
    function FE() {
      Es = !0;
    }
    function dw() {
      return Es;
    }
    function pw(e) {
      var t = e.stateNode.containerInfo;
      return li = Lx(t), Sr = e, ki = !0, lo = null, Es = !1, !0;
    }
    function vw(e, t, a) {
      return li = Mx(t), Sr = e, ki = !0, lo = null, Es = !1, a !== null && cw(e, a), !0;
    }
    function HE(e, t) {
      switch (e.tag) {
        case $: {
          Px(e.stateNode.containerInfo, t);
          break;
        }
        case re: {
          var a = (e.mode & Oe) !== De;
          Yx(
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
          i.dehydrated !== null && $x(i.dehydrated, t);
          break;
        }
      }
    }
    function VE(e, t) {
      HE(e, t);
      var a = g_();
      a.stateNode = t, a.return = e;
      var i = e.deletions;
      i === null ? (e.deletions = [a], e.flags |= Dt) : i.push(a);
    }
    function wg(e, t) {
      {
        if (Es)
          return;
        switch (e.tag) {
          case $: {
            var a = e.stateNode.containerInfo;
            switch (t.tag) {
              case re:
                var i = t.type;
                t.pendingProps, Ix(a, i);
                break;
              case xe:
                var u = t.pendingProps;
                Qx(a, u);
                break;
            }
            break;
          }
          case re: {
            var s = e.type, f = e.memoizedProps, p = e.stateNode;
            switch (t.tag) {
              case re: {
                var v = t.type, g = t.pendingProps, E = (e.mode & Oe) !== De;
                qx(
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
                var _ = t.pendingProps, b = (e.mode & Oe) !== De;
                Xx(
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
            var U = e.memoizedState, H = U.dehydrated;
            if (H !== null) switch (t.tag) {
              case re:
                var j = t.type;
                t.pendingProps, Wx(H, j);
                break;
              case xe:
                var de = t.pendingProps;
                Gx(H, de);
                break;
            }
            break;
          }
          default:
            return;
        }
      }
    }
    function jE(e, t) {
      t.flags = t.flags & ~ga | Qt, wg(e, t);
    }
    function BE(e, t) {
      switch (e.tag) {
        case re: {
          var a = e.type;
          e.pendingProps;
          var i = wx(t, a);
          return i !== null ? (e.stateNode = i, Sr = e, li = Ox(i), !0) : !1;
        }
        case xe: {
          var u = e.pendingProps, s = bx(t, u);
          return s !== null ? (e.stateNode = s, Sr = e, li = null, !0) : !1;
        }
        case Ne: {
          var f = Dx(t);
          if (f !== null) {
            var p = {
              dehydrated: f,
              treeContext: sw(),
              retryLane: dr
            };
            e.memoizedState = p;
            var v = S_(f);
            return v.return = e, e.child = v, Sr = e, li = null, !0;
          }
          return !1;
        }
        default:
          return !1;
      }
    }
    function bg(e) {
      return (e.mode & Oe) !== De && (e.flags & Qe) === He;
    }
    function Dg(e) {
      throw new Error("Hydration failed because the initial UI does not match what was rendered on the server.");
    }
    function _g(e) {
      if (ki) {
        var t = li;
        if (!t) {
          bg(e) && (wg(Sr, e), Dg()), jE(Sr, e), ki = !1, Sr = e;
          return;
        }
        var a = t;
        if (!BE(e, t)) {
          bg(e) && (wg(Sr, e), Dg()), t = tp(a);
          var i = Sr;
          if (!t || !BE(e, t)) {
            jE(Sr, e), ki = !1, Sr = e;
            return;
          }
          VE(i, a);
        }
      }
    }
    function hw(e, t, a) {
      var i = e.stateNode, u = !Es, s = Nx(i, e.type, e.memoizedProps, t, a, e, u);
      return e.updateQueue = s, s !== null;
    }
    function mw(e) {
      var t = e.stateNode, a = e.memoizedProps, i = Ux(t, a, e);
      if (i) {
        var u = Sr;
        if (u !== null)
          switch (u.tag) {
            case $: {
              var s = u.stateNode.containerInfo, f = (u.mode & Oe) !== De;
              jx(
                s,
                t,
                a,
                // TODO: Delete this argument when we remove the legacy root API.
                f
              );
              break;
            }
            case re: {
              var p = u.type, v = u.memoizedProps, g = u.stateNode, E = (u.mode & Oe) !== De;
              Bx(
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
    function yw(e) {
      var t = e.memoizedState, a = t !== null ? t.dehydrated : null;
      if (!a)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      zx(a, e);
    }
    function gw(e) {
      var t = e.memoizedState, a = t !== null ? t.dehydrated : null;
      if (!a)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      return Ax(a);
    }
    function PE(e) {
      for (var t = e.return; t !== null && t.tag !== re && t.tag !== $ && t.tag !== Ne; )
        t = t.return;
      Sr = t;
    }
    function Gh(e) {
      if (e !== Sr)
        return !1;
      if (!ki)
        return PE(e), ki = !0, !1;
      if (e.tag !== $ && (e.tag !== re || Vx(e.type) && !sg(e.type, e.memoizedProps))) {
        var t = li;
        if (t)
          if (bg(e))
            $E(e), Dg();
          else
            for (; t; )
              VE(e, t), t = tp(t);
      }
      return PE(e), e.tag === Ne ? li = gw(e) : li = Sr ? tp(e.stateNode) : null, !0;
    }
    function Sw() {
      return ki && li !== null;
    }
    function $E(e) {
      for (var t = li; t; )
        HE(e, t), t = tp(t);
    }
    function ff() {
      Sr = null, li = null, ki = !1, Es = !1;
    }
    function YE() {
      lo !== null && (F1(lo), lo = null);
    }
    function Er() {
      return ki;
    }
    function kg(e) {
      lo === null ? lo = [e] : lo.push(e);
    }
    var Ew = y.ReactCurrentBatchConfig, Cw = null;
    function Tw() {
      return Ew.transition;
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
      var Rw = function(e) {
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
          z(`componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, g);
        }
        if (a.size > 0) {
          var E = Cs(a);
          z(`componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, E);
        }
        if (u.size > 0) {
          var _ = Cs(u);
          z(`componentWillUpdate has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, _);
        }
      };
      var qh = /* @__PURE__ */ new Map(), IE = /* @__PURE__ */ new Set();
      Oi.recordLegacyContextWarning = function(e, t) {
        var a = Rw(e);
        if (a === null) {
          S("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");
          return;
        }
        if (!IE.has(e.type)) {
          var i = qh.get(a);
          (e.type.contextTypes != null || e.type.childContextTypes != null || t !== null && typeof t.getChildContext == "function") && (i === void 0 && (i = [], qh.set(a, i)), i.push(e));
        }
      }, Oi.flushLegacyContextWarning = function() {
        qh.forEach(function(e, t) {
          if (e.length !== 0) {
            var a = e[0], i = /* @__PURE__ */ new Set();
            e.forEach(function(s) {
              i.add(et(s) || "Component"), IE.add(s.type);
            });
            var u = Cs(i);
            try {
              zt(a), S(`Legacy context API has been detected within a strict-mode tree.

The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.

Please update the following components: %s

Learn more about this warning here: https://reactjs.org/link/legacy-context`, u);
            } finally {
              bn();
            }
          }
        });
      }, Oi.discardPendingWarnings = function() {
        ip = [], lp = [], up = [], op = [], sp = [], cp = [], qh = /* @__PURE__ */ new Map();
      };
    }
    var Og, Lg, Mg, Ng, Ug, QE = function(e, t) {
    };
    Og = !1, Lg = !1, Mg = {}, Ng = {}, Ug = {}, QE = function(e, t) {
      if (!(e === null || typeof e != "object") && !(!e._store || e._store.validated || e.key != null)) {
        if (typeof e._store != "object")
          throw new Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
        e._store.validated = !0;
        var a = et(t) || "Component";
        Ng[a] || (Ng[a] = !0, S('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.'));
      }
    };
    function xw(e) {
      return e.prototype && e.prototype.isReactComponent;
    }
    function fp(e, t, a) {
      var i = a.ref;
      if (i !== null && typeof i != "function" && typeof i != "object") {
        if ((e.mode & ut || Un) && // We warn in ReactElement.js if owner and self are equal for string refs
        // because these cannot be automatically converted to an arrow function
        // using a codemod. Therefore, we don't have to warn about string refs again.
        !(a._owner && a._self && a._owner.stateNode !== a._self) && // Will already throw with "Function components cannot have string refs"
        !(a._owner && a._owner.tag !== ce) && // Will already warn with "Function components cannot be given refs"
        !(typeof a.type == "function" && !xw(a.type)) && // Will already throw with "Element ref was specified as a string (someStringRef) but no owner was set"
        a._owner) {
          var u = et(e) || "Component";
          Mg[u] || (S('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', u, i), Mg[u] = !0);
        }
        if (a._owner) {
          var s = a._owner, f;
          if (s) {
            var p = s;
            if (p.tag !== ce)
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
    function Xh(e, t) {
      var a = Object.prototype.toString.call(t);
      throw new Error("Objects are not valid as a React child (found: " + (a === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : a) + "). If you meant to render a collection of children, use an array instead.");
    }
    function Kh(e) {
      {
        var t = et(e) || "Component";
        if (Ug[t])
          return;
        Ug[t] = !0, S("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
      }
    }
    function WE(e) {
      var t = e._payload, a = e._init;
      return a(t);
    }
    function GE(e) {
      function t(O, B) {
        if (e) {
          var L = O.deletions;
          L === null ? (O.deletions = [B], O.flags |= Dt) : L.push(B);
        }
      }
      function a(O, B) {
        if (!e)
          return null;
        for (var L = B; L !== null; )
          t(O, L), L = L.sibling;
        return null;
      }
      function i(O, B) {
        for (var L = /* @__PURE__ */ new Map(), K = B; K !== null; )
          K.key !== null ? L.set(K.key, K) : L.set(K.index, K), K = K.sibling;
        return L;
      }
      function u(O, B) {
        var L = Ls(O, B);
        return L.index = 0, L.sibling = null, L;
      }
      function s(O, B, L) {
        if (O.index = L, !e)
          return O.flags |= fd, B;
        var K = O.alternate;
        if (K !== null) {
          var ye = K.index;
          return ye < B ? (O.flags |= Qt, B) : ye;
        } else
          return O.flags |= Qt, B;
      }
      function f(O) {
        return e && O.alternate === null && (O.flags |= Qt), O;
      }
      function p(O, B, L, K) {
        if (B === null || B.tag !== xe) {
          var ye = k0(L, O.mode, K);
          return ye.return = O, ye;
        } else {
          var ve = u(B, L);
          return ve.return = O, ve;
        }
      }
      function v(O, B, L, K) {
        var ye = L.type;
        if (ye === Fa)
          return E(O, B, L.props.children, K, L.key);
        if (B !== null && (B.elementType === ye || // Keep this check inline so it only runs on the false path:
        J1(B, L) || // Lazy types should reconcile their resolved type.
        // We need to do this after the Hot Reloading check above,
        // because hot reloading has different semantics than prod because
        // it doesn't resuspend. So we can't let the call below suspend.
        typeof ye == "object" && ye !== null && ye.$$typeof === $e && WE(ye) === B.type)) {
          var ve = u(B, L.props);
          return ve.ref = fp(O, B, L), ve.return = O, ve._debugSource = L._source, ve._debugOwner = L._owner, ve;
        }
        var Ye = _0(L, O.mode, K);
        return Ye.ref = fp(O, B, L), Ye.return = O, Ye;
      }
      function g(O, B, L, K) {
        if (B === null || B.tag !== ue || B.stateNode.containerInfo !== L.containerInfo || B.stateNode.implementation !== L.implementation) {
          var ye = O0(L, O.mode, K);
          return ye.return = O, ye;
        } else {
          var ve = u(B, L.children || []);
          return ve.return = O, ve;
        }
      }
      function E(O, B, L, K, ye) {
        if (B === null || B.tag !== Ze) {
          var ve = go(L, O.mode, K, ye);
          return ve.return = O, ve;
        } else {
          var Ye = u(B, L);
          return Ye.return = O, Ye;
        }
      }
      function _(O, B, L) {
        if (typeof B == "string" && B !== "" || typeof B == "number") {
          var K = k0("" + B, O.mode, L);
          return K.return = O, K;
        }
        if (typeof B == "object" && B !== null) {
          switch (B.$$typeof) {
            case di: {
              var ye = _0(B, O.mode, L);
              return ye.ref = fp(O, null, B), ye.return = O, ye;
            }
            case Gr: {
              var ve = O0(B, O.mode, L);
              return ve.return = O, ve;
            }
            case $e: {
              var Ye = B._payload, Ke = B._init;
              return _(O, Ke(Ye), L);
            }
          }
          if (Vn(B) || qr(B)) {
            var Ft = go(B, O.mode, L, null);
            return Ft.return = O, Ft;
          }
          Xh(O, B);
        }
        return typeof B == "function" && Kh(O), null;
      }
      function b(O, B, L, K) {
        var ye = B !== null ? B.key : null;
        if (typeof L == "string" && L !== "" || typeof L == "number")
          return ye !== null ? null : p(O, B, "" + L, K);
        if (typeof L == "object" && L !== null) {
          switch (L.$$typeof) {
            case di:
              return L.key === ye ? v(O, B, L, K) : null;
            case Gr:
              return L.key === ye ? g(O, B, L, K) : null;
            case $e: {
              var ve = L._payload, Ye = L._init;
              return b(O, B, Ye(ve), K);
            }
          }
          if (Vn(L) || qr(L))
            return ye !== null ? null : E(O, B, L, K, null);
          Xh(O, L);
        }
        return typeof L == "function" && Kh(O), null;
      }
      function U(O, B, L, K, ye) {
        if (typeof K == "string" && K !== "" || typeof K == "number") {
          var ve = O.get(L) || null;
          return p(B, ve, "" + K, ye);
        }
        if (typeof K == "object" && K !== null) {
          switch (K.$$typeof) {
            case di: {
              var Ye = O.get(K.key === null ? L : K.key) || null;
              return v(B, Ye, K, ye);
            }
            case Gr: {
              var Ke = O.get(K.key === null ? L : K.key) || null;
              return g(B, Ke, K, ye);
            }
            case $e:
              var Ft = K._payload, Rt = K._init;
              return U(O, B, L, Rt(Ft), ye);
          }
          if (Vn(K) || qr(K)) {
            var Mn = O.get(L) || null;
            return E(B, Mn, K, ye, null);
          }
          Xh(B, K);
        }
        return typeof K == "function" && Kh(B), null;
      }
      function H(O, B, L) {
        {
          if (typeof O != "object" || O === null)
            return B;
          switch (O.$$typeof) {
            case di:
            case Gr:
              QE(O, L);
              var K = O.key;
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
              var ye = O._payload, ve = O._init;
              H(ve(ye), B, L);
              break;
          }
        }
        return B;
      }
      function j(O, B, L, K) {
        for (var ye = null, ve = 0; ve < L.length; ve++) {
          var Ye = L[ve];
          ye = H(Ye, ye, O);
        }
        for (var Ke = null, Ft = null, Rt = B, Mn = 0, xt = 0, Rn = null; Rt !== null && xt < L.length; xt++) {
          Rt.index > xt ? (Rn = Rt, Rt = null) : Rn = Rt.sibling;
          var Ir = b(O, Rt, L[xt], K);
          if (Ir === null) {
            Rt === null && (Rt = Rn);
            break;
          }
          e && Rt && Ir.alternate === null && t(O, Rt), Mn = s(Ir, Mn, xt), Ft === null ? Ke = Ir : Ft.sibling = Ir, Ft = Ir, Rt = Rn;
        }
        if (xt === L.length) {
          if (a(O, Rt), Er()) {
            var Dr = xt;
            gs(O, Dr);
          }
          return Ke;
        }
        if (Rt === null) {
          for (; xt < L.length; xt++) {
            var Wa = _(O, L[xt], K);
            Wa !== null && (Mn = s(Wa, Mn, xt), Ft === null ? Ke = Wa : Ft.sibling = Wa, Ft = Wa);
          }
          if (Er()) {
            var la = xt;
            gs(O, la);
          }
          return Ke;
        }
        for (var ua = i(O, Rt); xt < L.length; xt++) {
          var Qr = U(ua, O, xt, L[xt], K);
          Qr !== null && (e && Qr.alternate !== null && ua.delete(Qr.key === null ? xt : Qr.key), Mn = s(Qr, Mn, xt), Ft === null ? Ke = Qr : Ft.sibling = Qr, Ft = Qr);
        }
        if (e && ua.forEach(function(Of) {
          return t(O, Of);
        }), Er()) {
          var lu = xt;
          gs(O, lu);
        }
        return Ke;
      }
      function de(O, B, L, K) {
        var ye = qr(L);
        if (typeof ye != "function")
          throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
        {
          typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
          L[Symbol.toStringTag] === "Generator" && (Lg || S("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), Lg = !0), L.entries === ye && (Og || S("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), Og = !0);
          var ve = ye.call(L);
          if (ve)
            for (var Ye = null, Ke = ve.next(); !Ke.done; Ke = ve.next()) {
              var Ft = Ke.value;
              Ye = H(Ft, Ye, O);
            }
        }
        var Rt = ye.call(L);
        if (Rt == null)
          throw new Error("An iterable object provided no iterator.");
        for (var Mn = null, xt = null, Rn = B, Ir = 0, Dr = 0, Wa = null, la = Rt.next(); Rn !== null && !la.done; Dr++, la = Rt.next()) {
          Rn.index > Dr ? (Wa = Rn, Rn = null) : Wa = Rn.sibling;
          var ua = b(O, Rn, la.value, K);
          if (ua === null) {
            Rn === null && (Rn = Wa);
            break;
          }
          e && Rn && ua.alternate === null && t(O, Rn), Ir = s(ua, Ir, Dr), xt === null ? Mn = ua : xt.sibling = ua, xt = ua, Rn = Wa;
        }
        if (la.done) {
          if (a(O, Rn), Er()) {
            var Qr = Dr;
            gs(O, Qr);
          }
          return Mn;
        }
        if (Rn === null) {
          for (; !la.done; Dr++, la = Rt.next()) {
            var lu = _(O, la.value, K);
            lu !== null && (Ir = s(lu, Ir, Dr), xt === null ? Mn = lu : xt.sibling = lu, xt = lu);
          }
          if (Er()) {
            var Of = Dr;
            gs(O, Of);
          }
          return Mn;
        }
        for (var $p = i(O, Rn); !la.done; Dr++, la = Rt.next()) {
          var hl = U($p, O, Dr, la.value, K);
          hl !== null && (e && hl.alternate !== null && $p.delete(hl.key === null ? Dr : hl.key), Ir = s(hl, Ir, Dr), xt === null ? Mn = hl : xt.sibling = hl, xt = hl);
        }
        if (e && $p.forEach(function(X_) {
          return t(O, X_);
        }), Er()) {
          var q_ = Dr;
          gs(O, q_);
        }
        return Mn;
      }
      function je(O, B, L, K) {
        if (B !== null && B.tag === xe) {
          a(O, B.sibling);
          var ye = u(B, L);
          return ye.return = O, ye;
        }
        a(O, B);
        var ve = k0(L, O.mode, K);
        return ve.return = O, ve;
      }
      function Le(O, B, L, K) {
        for (var ye = L.key, ve = B; ve !== null; ) {
          if (ve.key === ye) {
            var Ye = L.type;
            if (Ye === Fa) {
              if (ve.tag === Ze) {
                a(O, ve.sibling);
                var Ke = u(ve, L.props.children);
                return Ke.return = O, Ke._debugSource = L._source, Ke._debugOwner = L._owner, Ke;
              }
            } else if (ve.elementType === Ye || // Keep this check inline so it only runs on the false path:
            J1(ve, L) || // Lazy types should reconcile their resolved type.
            // We need to do this after the Hot Reloading check above,
            // because hot reloading has different semantics than prod because
            // it doesn't resuspend. So we can't let the call below suspend.
            typeof Ye == "object" && Ye !== null && Ye.$$typeof === $e && WE(Ye) === ve.type) {
              a(O, ve.sibling);
              var Ft = u(ve, L.props);
              return Ft.ref = fp(O, ve, L), Ft.return = O, Ft._debugSource = L._source, Ft._debugOwner = L._owner, Ft;
            }
            a(O, ve);
            break;
          } else
            t(O, ve);
          ve = ve.sibling;
        }
        if (L.type === Fa) {
          var Rt = go(L.props.children, O.mode, K, L.key);
          return Rt.return = O, Rt;
        } else {
          var Mn = _0(L, O.mode, K);
          return Mn.ref = fp(O, B, L), Mn.return = O, Mn;
        }
      }
      function yt(O, B, L, K) {
        for (var ye = L.key, ve = B; ve !== null; ) {
          if (ve.key === ye)
            if (ve.tag === ue && ve.stateNode.containerInfo === L.containerInfo && ve.stateNode.implementation === L.implementation) {
              a(O, ve.sibling);
              var Ye = u(ve, L.children || []);
              return Ye.return = O, Ye;
            } else {
              a(O, ve);
              break;
            }
          else
            t(O, ve);
          ve = ve.sibling;
        }
        var Ke = O0(L, O.mode, K);
        return Ke.return = O, Ke;
      }
      function ft(O, B, L, K) {
        var ye = typeof L == "object" && L !== null && L.type === Fa && L.key === null;
        if (ye && (L = L.props.children), typeof L == "object" && L !== null) {
          switch (L.$$typeof) {
            case di:
              return f(Le(O, B, L, K));
            case Gr:
              return f(yt(O, B, L, K));
            case $e:
              var ve = L._payload, Ye = L._init;
              return ft(O, B, Ye(ve), K);
          }
          if (Vn(L))
            return j(O, B, L, K);
          if (qr(L))
            return de(O, B, L, K);
          Xh(O, L);
        }
        return typeof L == "string" && L !== "" || typeof L == "number" ? f(je(O, B, "" + L, K)) : (typeof L == "function" && Kh(O), a(O, B));
      }
      return ft;
    }
    var df = GE(!0), qE = GE(!1);
    function ww(e, t) {
      if (e !== null && t.child !== e.child)
        throw new Error("Resuming work not yet implemented.");
      if (t.child !== null) {
        var a = t.child, i = Ls(a, a.pendingProps);
        for (t.child = i, i.return = t; a.sibling !== null; )
          a = a.sibling, i = i.sibling = Ls(a, a.pendingProps), i.return = t;
        i.sibling = null;
      }
    }
    function bw(e, t) {
      for (var a = e.child; a !== null; )
        p_(a, t), a = a.sibling;
    }
    var zg = ro(null), Ag;
    Ag = {};
    var Zh = null, pf = null, Fg = null, Jh = !1;
    function em() {
      Zh = null, pf = null, Fg = null, Jh = !1;
    }
    function XE() {
      Jh = !0;
    }
    function KE() {
      Jh = !1;
    }
    function ZE(e, t, a) {
      $r(zg, t._currentValue, e), t._currentValue = a, t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== Ag && S("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), t._currentRenderer = Ag;
    }
    function Hg(e, t) {
      var a = zg.current;
      Pr(zg, t), e._currentValue = a;
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
    function Dw(e, t, a) {
      _w(e, t, a);
    }
    function _w(e, t, a) {
      var i = e.child;
      for (i !== null && (i.return = e); i !== null; ) {
        var u = void 0, s = i.dependencies;
        if (s !== null) {
          u = i.child;
          for (var f = s.firstContext; f !== null; ) {
            if (f.context === t) {
              if (i.tag === ce) {
                var p = Hu(a), v = eu($t, p);
                v.tag = nm;
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
          var U = i.return;
          if (U === null)
            throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");
          U.lanes = tt(U.lanes, a);
          var H = U.alternate;
          H !== null && (H.lanes = tt(H.lanes, a)), Vg(U, a, e), u = i.sibling;
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
      Zh = e, pf = null, Fg = null;
      var a = e.dependencies;
      if (a !== null) {
        var i = a.firstContext;
        i !== null && (jr(a.lanes, t) && bp(), a.firstContext = null);
      }
    }
    function In(e) {
      Jh && S("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      var t = e._currentValue;
      if (Fg !== e) {
        var a = {
          context: e,
          memoizedValue: t,
          next: null
        };
        if (pf === null) {
          if (Zh === null)
            throw new Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
          pf = a, Zh.dependencies = {
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
    function kw() {
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
    function JE(e, t, a, i) {
      var u = t.interleaved;
      return u === null ? (a.next = a, jg(t)) : (a.next = u.next, u.next = a), t.interleaved = a, tm(e, i);
    }
    function Ow(e, t, a, i) {
      var u = t.interleaved;
      u === null ? (a.next = a, jg(t)) : (a.next = u.next, u.next = a), t.interleaved = a;
    }
    function Lw(e, t, a, i) {
      var u = t.interleaved;
      return u === null ? (a.next = a, jg(t)) : (a.next = u.next, u.next = a), t.interleaved = a, tm(e, i);
    }
    function Oa(e, t) {
      return tm(e, t);
    }
    var Mw = tm;
    function tm(e, t) {
      e.lanes = tt(e.lanes, t);
      var a = e.alternate;
      a !== null && (a.lanes = tt(a.lanes, t)), a === null && (e.flags & (Qt | ga)) !== He && q1(e);
      for (var i = e, u = e.return; u !== null; )
        u.childLanes = tt(u.childLanes, t), a = u.alternate, a !== null ? a.childLanes = tt(a.childLanes, t) : (u.flags & (Qt | ga)) !== He && q1(e), i = u, u = u.return;
      if (i.tag === $) {
        var s = i.stateNode;
        return s;
      } else
        return null;
    }
    var eC = 0, tC = 1, nm = 2, Bg = 3, rm = !1, Pg, am;
    Pg = !1, am = null;
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
    function nC(e, t) {
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
        tag: eC,
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
      if (am === u && !Pg && (S("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."), Pg = !0), OD()) {
        var s = u.pending;
        return s === null ? t.next = t : (t.next = s.next, s.next = t), u.pending = t, Mw(e, a);
      } else
        return Lw(e, u, t, a);
    }
    function im(e, t, a) {
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
    function Nw(e, t, a, i, u, s) {
      switch (a.tag) {
        case tC: {
          var f = a.payload;
          if (typeof f == "function") {
            XE();
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
              KE();
            }
            return p;
          }
          return f;
        }
        case Bg:
          e.flags = e.flags & ~Bn | Qe;
        case eC: {
          var v = a.payload, g;
          if (typeof v == "function") {
            XE(), g = v.call(s, i, u);
            {
              if (e.mode & ut) {
                Cn(!0);
                try {
                  v.call(s, i, u);
                } finally {
                  Cn(!1);
                }
              }
              KE();
            }
          } else
            g = v;
          return g == null ? i : lt({}, i, g);
        }
        case nm:
          return rm = !0, i;
      }
      return i;
    }
    function lm(e, t, a, i) {
      var u = e.updateQueue;
      rm = !1, am = u.shared;
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
        var U = u.baseState, H = I, j = null, de = null, je = null, Le = s;
        do {
          var yt = Le.lane, ft = Le.eventTime;
          if (Bl(i, yt)) {
            if (je !== null) {
              var B = {
                eventTime: ft,
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: Tn,
                tag: Le.tag,
                payload: Le.payload,
                callback: Le.callback,
                next: null
              };
              je = je.next = B;
            }
            U = Nw(e, u, Le, U, t, a);
            var L = Le.callback;
            if (L !== null && // If the update was already committed, we should not queue its
            // callback again.
            Le.lane !== Tn) {
              e.flags |= Za;
              var K = u.effects;
              K === null ? u.effects = [Le] : K.push(Le);
            }
          } else {
            var O = {
              eventTime: ft,
              lane: yt,
              tag: Le.tag,
              payload: Le.payload,
              callback: Le.callback,
              next: null
            };
            je === null ? (de = je = O, j = U) : je = je.next = O, H = tt(H, yt);
          }
          if (Le = Le.next, Le === null) {
            if (p = u.shared.pending, p === null)
              break;
            var ye = p, ve = ye.next;
            ye.next = null, Le = ve, u.lastBaseUpdate = ye, u.shared.pending = null;
          }
        } while (!0);
        je === null && (j = U), u.baseState = j, u.firstBaseUpdate = de, u.lastBaseUpdate = je;
        var Ye = u.shared.interleaved;
        if (Ye !== null) {
          var Ke = Ye;
          do
            H = tt(H, Ke.lane), Ke = Ke.next;
          while (Ke !== Ye);
        } else s === null && (u.shared.lanes = I);
        Hp(H), e.lanes = H, e.memoizedState = U;
      }
      am = null;
    }
    function Uw(e, t) {
      if (typeof e != "function")
        throw new Error("Invalid argument passed as callback. Expected a function. Instead " + ("received: " + e));
      e.call(t);
    }
    function rC() {
      rm = !1;
    }
    function um() {
      return rm;
    }
    function aC(e, t, a) {
      var i = t.effects;
      if (t.effects = null, i !== null)
        for (var u = 0; u < i.length; u++) {
          var s = i[u], f = s.callback;
          f !== null && (s.callback = null, Uw(f, a));
        }
    }
    var dp = {}, oo = ro(dp), pp = ro(dp), om = ro(dp);
    function sm(e) {
      if (e === dp)
        throw new Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");
      return e;
    }
    function iC() {
      var e = sm(om.current);
      return e;
    }
    function Ig(e, t) {
      $r(om, t, e), $r(pp, e, e), $r(oo, dp, e);
      var a = KR(t);
      Pr(oo, e), $r(oo, a, e);
    }
    function hf(e) {
      Pr(oo, e), Pr(pp, e), Pr(om, e);
    }
    function Qg() {
      var e = sm(oo.current);
      return e;
    }
    function lC(e) {
      sm(om.current);
      var t = sm(oo.current), a = ZR(t, e.type);
      t !== a && ($r(pp, e, e), $r(oo, a, e));
    }
    function Wg(e) {
      pp.current === e && (Pr(oo, e), Pr(pp, e));
    }
    var zw = 0, uC = 1, oC = 1, vp = 2, Li = ro(zw);
    function Gg(e, t) {
      return (e & t) !== 0;
    }
    function mf(e) {
      return e & uC;
    }
    function qg(e, t) {
      return e & uC | t;
    }
    function Aw(e, t) {
      return e | t;
    }
    function so(e, t) {
      $r(Li, t, e);
    }
    function yf(e) {
      Pr(Li, e);
    }
    function Fw(e, t) {
      var a = e.memoizedState;
      return a !== null ? a.dehydrated !== null : (e.memoizedProps, !0);
    }
    function cm(e) {
      for (var t = e; t !== null; ) {
        if (t.tag === Ne) {
          var a = t.memoizedState;
          if (a !== null) {
            var i = a.dehydrated;
            if (i === null || wE(i) || pg(i))
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
    ), Jn = (
      /* */
      1
    ), ol = (
      /*  */
      2
    ), er = (
      /*    */
      4
    ), Cr = (
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
    function Hw(e, t) {
      var a = t._getVersion, i = a(t._source);
      e.mutableSourceEagerHydrationData == null ? e.mutableSourceEagerHydrationData = [t, i] : e.mutableSourceEagerHydrationData.push(t, i);
    }
    var me = y.ReactCurrentDispatcher, hp = y.ReactCurrentBatchConfig, Zg, gf;
    Zg = /* @__PURE__ */ new Set();
    var xs = I, At = null, tr = null, nr = null, fm = !1, mp = !1, yp = 0, Vw = 0, jw = 25, P = null, ui = null, co = -1, Jg = !1;
    function Lt() {
      {
        var e = P;
        ui === null ? ui = [e] : ui.push(e);
      }
    }
    function le() {
      {
        var e = P;
        ui !== null && (co++, ui[co] !== e && Bw(e));
      }
    }
    function Sf(e) {
      e != null && !Vn(e) && S("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", P, typeof e);
    }
    function Bw(e) {
      {
        var t = et(At);
        if (!Zg.has(t) && (Zg.add(t), ui !== null)) {
          for (var a = "", i = 30, u = 0; u <= co; u++) {
            for (var s = ui[u], f = u === co ? e : s, p = u + 1 + ". " + s; p.length < i; )
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
    function Yr() {
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
        return S("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", P), !1;
      e.length !== t.length && S(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`, P, "[" + t.join(", ") + "]", "[" + e.join(", ") + "]");
      for (var a = 0; a < t.length && a < e.length; a++)
        if (!Te(e[a], t[a]))
          return !1;
      return !0;
    }
    function Ef(e, t, a, i, u, s) {
      xs = s, At = t, ui = e !== null ? e._debugHookTypes : null, co = -1, Jg = e !== null && e.type !== t.type, t.memoizedState = null, t.updateQueue = null, t.lanes = I, e !== null && e.memoizedState !== null ? me.current = OC : ui !== null ? me.current = kC : me.current = _C;
      var f = a(i, u);
      if (mp) {
        var p = 0;
        do {
          if (mp = !1, yp = 0, p >= jw)
            throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
          p += 1, Jg = !1, tr = null, nr = null, t.updateQueue = null, co = -1, me.current = LC, f = a(i, u);
        } while (mp);
      }
      me.current = xm, t._debugHookTypes = ui;
      var v = tr !== null && tr.next !== null;
      if (xs = I, At = null, tr = null, nr = null, P = null, ui = null, co = -1, e !== null && (e.flags & Xn) !== (t.flags & Xn) && // Disable this warning in legacy mode, because legacy Suspense is weird
      // and creates false positives. To make this work in legacy mode, we'd
      // need to mark fibers that commit in an incomplete state, somehow. For
      // now I'll disable the warning that most of the bugs that would trigger
      // it are either exclusive to concurrent mode or exist in both.
      (e.mode & Oe) !== De && S("Internal React error: Expected static flag was missing. Please notify the React team."), fm = !1, v)
        throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
      return f;
    }
    function Cf() {
      var e = yp !== 0;
      return yp = 0, e;
    }
    function sC(e, t, a) {
      t.updateQueue = e.updateQueue, (t.mode & ta) !== De ? t.flags &= ~(Ml | Ur | Xt | nt) : t.flags &= ~(Xt | nt), e.lanes = ts(e.lanes, a);
    }
    function cC() {
      if (me.current = xm, fm) {
        for (var e = At.memoizedState; e !== null; ) {
          var t = e.queue;
          t !== null && (t.pending = null), e = e.next;
        }
        fm = !1;
      }
      xs = I, At = null, tr = null, nr = null, ui = null, co = -1, P = null, RC = !1, mp = !1, yp = 0;
    }
    function sl() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
      };
      return nr === null ? At.memoizedState = nr = e : nr = nr.next = e, nr;
    }
    function oi() {
      var e;
      if (tr === null) {
        var t = At.alternate;
        t !== null ? e = t.memoizedState : e = null;
      } else
        e = tr.next;
      var a;
      if (nr === null ? a = At.memoizedState : a = nr.next, a !== null)
        nr = a, a = nr.next, tr = e;
      else {
        if (e === null)
          throw new Error("Rendered more hooks than during the previous render.");
        tr = e;
        var i = {
          memoizedState: tr.memoizedState,
          baseState: tr.baseState,
          baseQueue: tr.baseQueue,
          queue: tr.queue,
          next: null
        };
        nr === null ? At.memoizedState = nr = i : nr = nr.next = i;
      }
      return nr;
    }
    function fC() {
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
      var f = s.dispatch = Iw.bind(null, At, s);
      return [i.memoizedState, f];
    }
    function rS(e, t, a) {
      var i = oi(), u = i.queue;
      if (u === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      u.lastRenderedReducer = e;
      var s = tr, f = s.baseQueue, p = u.pending;
      if (p !== null) {
        if (f !== null) {
          var v = f.next, g = p.next;
          f.next = g, p.next = v;
        }
        s.baseQueue !== f && S("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."), s.baseQueue = f = p, u.pending = null;
      }
      if (f !== null) {
        var E = f.next, _ = s.baseState, b = null, U = null, H = null, j = E;
        do {
          var de = j.lane;
          if (Bl(xs, de)) {
            if (H !== null) {
              var Le = {
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: Tn,
                action: j.action,
                hasEagerState: j.hasEagerState,
                eagerState: j.eagerState,
                next: null
              };
              H = H.next = Le;
            }
            if (j.hasEagerState)
              _ = j.eagerState;
            else {
              var yt = j.action;
              _ = e(_, yt);
            }
          } else {
            var je = {
              lane: de,
              action: j.action,
              hasEagerState: j.hasEagerState,
              eagerState: j.eagerState,
              next: null
            };
            H === null ? (U = H = je, b = _) : H = H.next = je, At.lanes = tt(At.lanes, de), Hp(de);
          }
          j = j.next;
        } while (j !== null && j !== E);
        H === null ? b = _ : H.next = U, Te(_, i.memoizedState) || bp(), i.memoizedState = _, i.baseState = b, i.baseQueue = H, u.lastRenderedState = _;
      }
      var ft = u.interleaved;
      if (ft !== null) {
        var O = ft;
        do {
          var B = O.lane;
          At.lanes = tt(At.lanes, B), Hp(B), O = O.next;
        } while (O !== ft);
      } else f === null && (u.lanes = I);
      var L = u.dispatch;
      return [i.memoizedState, L];
    }
    function aS(e, t, a) {
      var i = oi(), u = i.queue;
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
    function $k(e, t, a) {
    }
    function Yk(e, t, a) {
    }
    function iS(e, t, a) {
      var i = At, u = sl(), s, f = Er();
      if (f) {
        if (a === void 0)
          throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
        s = a(), gf || s !== a() && (S("The result of getServerSnapshot should be cached to avoid an infinite loop"), gf = !0);
      } else {
        if (s = t(), !gf) {
          var p = t();
          Te(s, p) || (S("The result of getSnapshot should be cached to avoid an infinite loop"), gf = !0);
        }
        var v = $m();
        if (v === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        es(v, xs) || dC(i, t, s);
      }
      u.memoizedState = s;
      var g = {
        value: s,
        getSnapshot: t
      };
      return u.queue = g, mm(vC.bind(null, i, g, e), [e]), i.flags |= Xt, gp(Jn | Cr, pC.bind(null, i, g, s, t), void 0, null), s;
    }
    function dm(e, t, a) {
      var i = At, u = oi(), s = t();
      if (!gf) {
        var f = t();
        Te(s, f) || (S("The result of getSnapshot should be cached to avoid an infinite loop"), gf = !0);
      }
      var p = u.memoizedState, v = !Te(p, s);
      v && (u.memoizedState = s, bp());
      var g = u.queue;
      if (Ep(vC.bind(null, i, g, e), [e]), g.getSnapshot !== t || v || // Check if the susbcribe function changed. We can save some memory by
      // checking whether we scheduled a subscription effect above.
      nr !== null && nr.memoizedState.tag & Jn) {
        i.flags |= Xt, gp(Jn | Cr, pC.bind(null, i, g, s, t), void 0, null);
        var E = $m();
        if (E === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        es(E, xs) || dC(i, t, s);
      }
      return s;
    }
    function dC(e, t, a) {
      e.flags |= Yo;
      var i = {
        getSnapshot: t,
        value: a
      }, u = At.updateQueue;
      if (u === null)
        u = fC(), At.updateQueue = u, u.stores = [i];
      else {
        var s = u.stores;
        s === null ? u.stores = [i] : s.push(i);
      }
    }
    function pC(e, t, a, i) {
      t.value = a, t.getSnapshot = i, hC(t) && mC(e);
    }
    function vC(e, t, a) {
      var i = function() {
        hC(t) && mC(e);
      };
      return a(i);
    }
    function hC(e) {
      var t = e.getSnapshot, a = e.value;
      try {
        var i = t();
        return !Te(a, i);
      } catch {
        return !0;
      }
    }
    function mC(e) {
      var t = Oa(e, Ae);
      t !== null && lr(t, e, Ae, $t);
    }
    function pm(e) {
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
      var i = a.dispatch = Qw.bind(null, At, a);
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
        s = fC(), At.updateQueue = s, s.lastEffect = u.next = u;
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
    function vm(e) {
      var t = oi();
      return t.memoizedState;
    }
    function Sp(e, t, a, i) {
      var u = sl(), s = i === void 0 ? null : i;
      At.flags |= e, u.memoizedState = gp(Jn | t, a, void 0, s);
    }
    function hm(e, t, a, i) {
      var u = oi(), s = i === void 0 ? null : i, f = void 0;
      if (tr !== null) {
        var p = tr.memoizedState;
        if (f = p.destroy, s !== null) {
          var v = p.deps;
          if (eS(s, v)) {
            u.memoizedState = gp(t, a, f, s);
            return;
          }
        }
      }
      At.flags |= e, u.memoizedState = gp(Jn | t, a, f, s);
    }
    function mm(e, t) {
      return (At.mode & ta) !== De ? Sp(Ml | Xt | Xi, Cr, e, t) : Sp(Xt | Xi, Cr, e, t);
    }
    function Ep(e, t) {
      return hm(Xt, Cr, e, t);
    }
    function sS(e, t) {
      return Sp(nt, ol, e, t);
    }
    function ym(e, t) {
      return hm(nt, ol, e, t);
    }
    function cS(e, t) {
      var a = nt;
      return a |= Nr, (At.mode & ta) !== De && (a |= Ur), Sp(a, er, e, t);
    }
    function gm(e, t) {
      return hm(nt, er, e, t);
    }
    function yC(e, t) {
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
      return u |= Nr, (At.mode & ta) !== De && (u |= Ur), Sp(u, er, yC.bind(null, t, e), i);
    }
    function Sm(e, t, a) {
      typeof t != "function" && S("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
      var i = a != null ? a.concat([e]) : null;
      return hm(nt, er, yC.bind(null, t, e), i);
    }
    function Pw(e, t) {
    }
    var Em = Pw;
    function dS(e, t) {
      var a = sl(), i = t === void 0 ? null : t;
      return a.memoizedState = [e, i], e;
    }
    function Cm(e, t) {
      var a = oi(), i = t === void 0 ? null : t, u = a.memoizedState;
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
    function Tm(e, t) {
      var a = oi(), i = t === void 0 ? null : t, u = a.memoizedState;
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
    function gC(e) {
      var t = oi(), a = tr, i = a.memoizedState;
      return EC(t, i, e);
    }
    function SC(e) {
      var t = oi();
      if (tr === null)
        return t.memoizedState = e, e;
      var a = tr.memoizedState;
      return EC(t, a, e);
    }
    function EC(e, t, a) {
      var i = !Zv(xs);
      if (i) {
        if (!Te(a, t)) {
          var u = th();
          At.lanes = tt(At.lanes, u), Hp(u), e.baseState = !0;
        }
        return t;
      } else
        return e.baseState && (e.baseState = !1, bp()), e.memoizedState = a, a;
    }
    function $w(e, t, a) {
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
          f > 10 && z("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), s._updatedFibers.clear();
        }
      }
    }
    function hS() {
      var e = pm(!1), t = e[0], a = e[1], i = $w.bind(null, a), u = sl();
      return u.memoizedState = i, [t, i];
    }
    function CC() {
      var e = lS(), t = e[0], a = oi(), i = a.memoizedState;
      return [t, i];
    }
    function TC() {
      var e = uS(), t = e[0], a = oi(), i = a.memoizedState;
      return [t, i];
    }
    var RC = !1;
    function Yw() {
      return RC;
    }
    function mS() {
      var e = sl(), t = $m(), a = t.identifierPrefix, i;
      if (Er()) {
        var u = uw();
        i = ":" + a + "R" + u;
        var s = yp++;
        s > 0 && (i += "H" + s.toString(32)), i += ":";
      } else {
        var f = Vw++;
        i = ":" + a + "r" + f.toString(32) + ":";
      }
      return e.memoizedState = i, i;
    }
    function Rm() {
      var e = oi(), t = e.memoizedState;
      return t;
    }
    function Iw(e, t, a) {
      typeof arguments[3] == "function" && S("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var i = mo(e), u = {
        lane: i,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (xC(e))
        wC(t, u);
      else {
        var s = JE(e, t, u, i);
        if (s !== null) {
          var f = ia();
          lr(s, e, i, f), bC(s, t, i);
        }
      }
      DC(e, i);
    }
    function Qw(e, t, a) {
      typeof arguments[3] == "function" && S("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var i = mo(e), u = {
        lane: i,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (xC(e))
        wC(t, u);
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
                Ow(e, t, u, i);
                return;
              }
            } catch {
            } finally {
              me.current = p;
            }
          }
        }
        var E = JE(e, t, u, i);
        if (E !== null) {
          var _ = ia();
          lr(E, e, i, _), bC(E, t, i);
        }
      }
      DC(e, i);
    }
    function xC(e) {
      var t = e.alternate;
      return e === At || t !== null && t === At;
    }
    function wC(e, t) {
      mp = fm = !0;
      var a = e.pending;
      a === null ? t.next = t : (t.next = a.next, a.next = t), e.pending = t;
    }
    function bC(e, t, a) {
      if (bd(a)) {
        var i = t.lanes;
        i = Oc(i, e.pendingLanes);
        var u = tt(i, a);
        t.lanes = u, Dd(e, u);
      }
    }
    function DC(e, t, a) {
      Go(e, t);
    }
    var xm = {
      readContext: In,
      useCallback: Yr,
      useContext: Yr,
      useEffect: Yr,
      useImperativeHandle: Yr,
      useInsertionEffect: Yr,
      useLayoutEffect: Yr,
      useMemo: Yr,
      useReducer: Yr,
      useRef: Yr,
      useState: Yr,
      useDebugValue: Yr,
      useDeferredValue: Yr,
      useTransition: Yr,
      useMutableSource: Yr,
      useSyncExternalStore: Yr,
      useId: Yr,
      unstable_isNewReconciler: ee
    }, _C = null, kC = null, OC = null, LC = null, cl = null, Mi = null, wm = null;
    {
      var yS = function() {
        S("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      }, qe = function() {
        S("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
      };
      _C = {
        readContext: function(e) {
          return In(e);
        },
        useCallback: function(e, t) {
          return P = "useCallback", Lt(), Sf(t), dS(e, t);
        },
        useContext: function(e) {
          return P = "useContext", Lt(), In(e);
        },
        useEffect: function(e, t) {
          return P = "useEffect", Lt(), Sf(t), mm(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return P = "useImperativeHandle", Lt(), Sf(a), fS(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return P = "useInsertionEffect", Lt(), Sf(t), sS(e, t);
        },
        useLayoutEffect: function(e, t) {
          return P = "useLayoutEffect", Lt(), Sf(t), cS(e, t);
        },
        useMemo: function(e, t) {
          P = "useMemo", Lt(), Sf(t);
          var a = me.current;
          me.current = cl;
          try {
            return pS(e, t);
          } finally {
            me.current = a;
          }
        },
        useReducer: function(e, t, a) {
          P = "useReducer", Lt();
          var i = me.current;
          me.current = cl;
          try {
            return nS(e, t, a);
          } finally {
            me.current = i;
          }
        },
        useRef: function(e) {
          return P = "useRef", Lt(), oS(e);
        },
        useState: function(e) {
          P = "useState", Lt();
          var t = me.current;
          me.current = cl;
          try {
            return pm(e);
          } finally {
            me.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return P = "useDebugValue", Lt(), void 0;
        },
        useDeferredValue: function(e) {
          return P = "useDeferredValue", Lt(), vS(e);
        },
        useTransition: function() {
          return P = "useTransition", Lt(), hS();
        },
        useMutableSource: function(e, t, a) {
          return P = "useMutableSource", Lt(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return P = "useSyncExternalStore", Lt(), iS(e, t, a);
        },
        useId: function() {
          return P = "useId", Lt(), mS();
        },
        unstable_isNewReconciler: ee
      }, kC = {
        readContext: function(e) {
          return In(e);
        },
        useCallback: function(e, t) {
          return P = "useCallback", le(), dS(e, t);
        },
        useContext: function(e) {
          return P = "useContext", le(), In(e);
        },
        useEffect: function(e, t) {
          return P = "useEffect", le(), mm(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return P = "useImperativeHandle", le(), fS(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return P = "useInsertionEffect", le(), sS(e, t);
        },
        useLayoutEffect: function(e, t) {
          return P = "useLayoutEffect", le(), cS(e, t);
        },
        useMemo: function(e, t) {
          P = "useMemo", le();
          var a = me.current;
          me.current = cl;
          try {
            return pS(e, t);
          } finally {
            me.current = a;
          }
        },
        useReducer: function(e, t, a) {
          P = "useReducer", le();
          var i = me.current;
          me.current = cl;
          try {
            return nS(e, t, a);
          } finally {
            me.current = i;
          }
        },
        useRef: function(e) {
          return P = "useRef", le(), oS(e);
        },
        useState: function(e) {
          P = "useState", le();
          var t = me.current;
          me.current = cl;
          try {
            return pm(e);
          } finally {
            me.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return P = "useDebugValue", le(), void 0;
        },
        useDeferredValue: function(e) {
          return P = "useDeferredValue", le(), vS(e);
        },
        useTransition: function() {
          return P = "useTransition", le(), hS();
        },
        useMutableSource: function(e, t, a) {
          return P = "useMutableSource", le(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return P = "useSyncExternalStore", le(), iS(e, t, a);
        },
        useId: function() {
          return P = "useId", le(), mS();
        },
        unstable_isNewReconciler: ee
      }, OC = {
        readContext: function(e) {
          return In(e);
        },
        useCallback: function(e, t) {
          return P = "useCallback", le(), Cm(e, t);
        },
        useContext: function(e) {
          return P = "useContext", le(), In(e);
        },
        useEffect: function(e, t) {
          return P = "useEffect", le(), Ep(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return P = "useImperativeHandle", le(), Sm(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return P = "useInsertionEffect", le(), ym(e, t);
        },
        useLayoutEffect: function(e, t) {
          return P = "useLayoutEffect", le(), gm(e, t);
        },
        useMemo: function(e, t) {
          P = "useMemo", le();
          var a = me.current;
          me.current = Mi;
          try {
            return Tm(e, t);
          } finally {
            me.current = a;
          }
        },
        useReducer: function(e, t, a) {
          P = "useReducer", le();
          var i = me.current;
          me.current = Mi;
          try {
            return rS(e, t, a);
          } finally {
            me.current = i;
          }
        },
        useRef: function(e) {
          return P = "useRef", le(), vm();
        },
        useState: function(e) {
          P = "useState", le();
          var t = me.current;
          me.current = Mi;
          try {
            return lS(e);
          } finally {
            me.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return P = "useDebugValue", le(), Em();
        },
        useDeferredValue: function(e) {
          return P = "useDeferredValue", le(), gC(e);
        },
        useTransition: function() {
          return P = "useTransition", le(), CC();
        },
        useMutableSource: function(e, t, a) {
          return P = "useMutableSource", le(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return P = "useSyncExternalStore", le(), dm(e, t);
        },
        useId: function() {
          return P = "useId", le(), Rm();
        },
        unstable_isNewReconciler: ee
      }, LC = {
        readContext: function(e) {
          return In(e);
        },
        useCallback: function(e, t) {
          return P = "useCallback", le(), Cm(e, t);
        },
        useContext: function(e) {
          return P = "useContext", le(), In(e);
        },
        useEffect: function(e, t) {
          return P = "useEffect", le(), Ep(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return P = "useImperativeHandle", le(), Sm(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return P = "useInsertionEffect", le(), ym(e, t);
        },
        useLayoutEffect: function(e, t) {
          return P = "useLayoutEffect", le(), gm(e, t);
        },
        useMemo: function(e, t) {
          P = "useMemo", le();
          var a = me.current;
          me.current = wm;
          try {
            return Tm(e, t);
          } finally {
            me.current = a;
          }
        },
        useReducer: function(e, t, a) {
          P = "useReducer", le();
          var i = me.current;
          me.current = wm;
          try {
            return aS(e, t, a);
          } finally {
            me.current = i;
          }
        },
        useRef: function(e) {
          return P = "useRef", le(), vm();
        },
        useState: function(e) {
          P = "useState", le();
          var t = me.current;
          me.current = wm;
          try {
            return uS(e);
          } finally {
            me.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return P = "useDebugValue", le(), Em();
        },
        useDeferredValue: function(e) {
          return P = "useDeferredValue", le(), SC(e);
        },
        useTransition: function() {
          return P = "useTransition", le(), TC();
        },
        useMutableSource: function(e, t, a) {
          return P = "useMutableSource", le(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return P = "useSyncExternalStore", le(), dm(e, t);
        },
        useId: function() {
          return P = "useId", le(), Rm();
        },
        unstable_isNewReconciler: ee
      }, cl = {
        readContext: function(e) {
          return yS(), In(e);
        },
        useCallback: function(e, t) {
          return P = "useCallback", qe(), Lt(), dS(e, t);
        },
        useContext: function(e) {
          return P = "useContext", qe(), Lt(), In(e);
        },
        useEffect: function(e, t) {
          return P = "useEffect", qe(), Lt(), mm(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return P = "useImperativeHandle", qe(), Lt(), fS(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return P = "useInsertionEffect", qe(), Lt(), sS(e, t);
        },
        useLayoutEffect: function(e, t) {
          return P = "useLayoutEffect", qe(), Lt(), cS(e, t);
        },
        useMemo: function(e, t) {
          P = "useMemo", qe(), Lt();
          var a = me.current;
          me.current = cl;
          try {
            return pS(e, t);
          } finally {
            me.current = a;
          }
        },
        useReducer: function(e, t, a) {
          P = "useReducer", qe(), Lt();
          var i = me.current;
          me.current = cl;
          try {
            return nS(e, t, a);
          } finally {
            me.current = i;
          }
        },
        useRef: function(e) {
          return P = "useRef", qe(), Lt(), oS(e);
        },
        useState: function(e) {
          P = "useState", qe(), Lt();
          var t = me.current;
          me.current = cl;
          try {
            return pm(e);
          } finally {
            me.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return P = "useDebugValue", qe(), Lt(), void 0;
        },
        useDeferredValue: function(e) {
          return P = "useDeferredValue", qe(), Lt(), vS(e);
        },
        useTransition: function() {
          return P = "useTransition", qe(), Lt(), hS();
        },
        useMutableSource: function(e, t, a) {
          return P = "useMutableSource", qe(), Lt(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return P = "useSyncExternalStore", qe(), Lt(), iS(e, t, a);
        },
        useId: function() {
          return P = "useId", qe(), Lt(), mS();
        },
        unstable_isNewReconciler: ee
      }, Mi = {
        readContext: function(e) {
          return yS(), In(e);
        },
        useCallback: function(e, t) {
          return P = "useCallback", qe(), le(), Cm(e, t);
        },
        useContext: function(e) {
          return P = "useContext", qe(), le(), In(e);
        },
        useEffect: function(e, t) {
          return P = "useEffect", qe(), le(), Ep(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return P = "useImperativeHandle", qe(), le(), Sm(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return P = "useInsertionEffect", qe(), le(), ym(e, t);
        },
        useLayoutEffect: function(e, t) {
          return P = "useLayoutEffect", qe(), le(), gm(e, t);
        },
        useMemo: function(e, t) {
          P = "useMemo", qe(), le();
          var a = me.current;
          me.current = Mi;
          try {
            return Tm(e, t);
          } finally {
            me.current = a;
          }
        },
        useReducer: function(e, t, a) {
          P = "useReducer", qe(), le();
          var i = me.current;
          me.current = Mi;
          try {
            return rS(e, t, a);
          } finally {
            me.current = i;
          }
        },
        useRef: function(e) {
          return P = "useRef", qe(), le(), vm();
        },
        useState: function(e) {
          P = "useState", qe(), le();
          var t = me.current;
          me.current = Mi;
          try {
            return lS(e);
          } finally {
            me.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return P = "useDebugValue", qe(), le(), Em();
        },
        useDeferredValue: function(e) {
          return P = "useDeferredValue", qe(), le(), gC(e);
        },
        useTransition: function() {
          return P = "useTransition", qe(), le(), CC();
        },
        useMutableSource: function(e, t, a) {
          return P = "useMutableSource", qe(), le(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return P = "useSyncExternalStore", qe(), le(), dm(e, t);
        },
        useId: function() {
          return P = "useId", qe(), le(), Rm();
        },
        unstable_isNewReconciler: ee
      }, wm = {
        readContext: function(e) {
          return yS(), In(e);
        },
        useCallback: function(e, t) {
          return P = "useCallback", qe(), le(), Cm(e, t);
        },
        useContext: function(e) {
          return P = "useContext", qe(), le(), In(e);
        },
        useEffect: function(e, t) {
          return P = "useEffect", qe(), le(), Ep(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return P = "useImperativeHandle", qe(), le(), Sm(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return P = "useInsertionEffect", qe(), le(), ym(e, t);
        },
        useLayoutEffect: function(e, t) {
          return P = "useLayoutEffect", qe(), le(), gm(e, t);
        },
        useMemo: function(e, t) {
          P = "useMemo", qe(), le();
          var a = me.current;
          me.current = Mi;
          try {
            return Tm(e, t);
          } finally {
            me.current = a;
          }
        },
        useReducer: function(e, t, a) {
          P = "useReducer", qe(), le();
          var i = me.current;
          me.current = Mi;
          try {
            return aS(e, t, a);
          } finally {
            me.current = i;
          }
        },
        useRef: function(e) {
          return P = "useRef", qe(), le(), vm();
        },
        useState: function(e) {
          P = "useState", qe(), le();
          var t = me.current;
          me.current = Mi;
          try {
            return uS(e);
          } finally {
            me.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return P = "useDebugValue", qe(), le(), Em();
        },
        useDeferredValue: function(e) {
          return P = "useDeferredValue", qe(), le(), SC(e);
        },
        useTransition: function() {
          return P = "useTransition", qe(), le(), TC();
        },
        useMutableSource: function(e, t, a) {
          return P = "useMutableSource", qe(), le(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return P = "useSyncExternalStore", qe(), le(), dm(e, t);
        },
        useId: function() {
          return P = "useId", qe(), le(), Rm();
        },
        unstable_isNewReconciler: ee
      };
    }
    var fo = T.unstable_now, MC = 0, bm = -1, Cp = -1, Dm = -1, gS = !1, _m = !1;
    function NC() {
      return gS;
    }
    function Ww() {
      _m = !0;
    }
    function Gw() {
      gS = !1, _m = !1;
    }
    function qw() {
      gS = _m, _m = !1;
    }
    function UC() {
      return MC;
    }
    function zC() {
      MC = fo();
    }
    function SS(e) {
      Cp = fo(), e.actualStartTime < 0 && (e.actualStartTime = fo());
    }
    function AC(e) {
      Cp = -1;
    }
    function km(e, t) {
      if (Cp >= 0) {
        var a = fo() - Cp;
        e.actualDuration += a, t && (e.selfBaseDuration = a), Cp = -1;
      }
    }
    function fl(e) {
      if (bm >= 0) {
        var t = fo() - bm;
        bm = -1;
        for (var a = e.return; a !== null; ) {
          switch (a.tag) {
            case $:
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
      if (Dm >= 0) {
        var t = fo() - Dm;
        Dm = -1;
        for (var a = e.return; a !== null; ) {
          switch (a.tag) {
            case $:
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
      bm = fo();
    }
    function CS() {
      Dm = fo();
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
    var RS = {}, xS, wS, bS, DS, _S, FC, Om, kS, OS, LS, Tp;
    {
      xS = /* @__PURE__ */ new Set(), wS = /* @__PURE__ */ new Set(), bS = /* @__PURE__ */ new Set(), DS = /* @__PURE__ */ new Set(), kS = /* @__PURE__ */ new Set(), _S = /* @__PURE__ */ new Set(), OS = /* @__PURE__ */ new Set(), LS = /* @__PURE__ */ new Set(), Tp = /* @__PURE__ */ new Set();
      var HC = /* @__PURE__ */ new Set();
      Om = function(e, t) {
        if (!(e === null || typeof e == "function")) {
          var a = t + "_" + e;
          HC.has(a) || (HC.add(a), S("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e));
        }
      }, FC = function(e, t) {
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
        FC(t, s);
      }
      var f = s == null ? u : lt({}, u, s);
      if (e.memoizedState = f, e.lanes === I) {
        var p = e.updateQueue;
        p.baseState = f;
      }
    }
    var NS = {
      isMounted: Jr,
      enqueueSetState: function(e, t, a) {
        var i = ma(e), u = ia(), s = mo(i), f = eu(u, s);
        f.payload = t, a != null && (Om(a, "setState"), f.callback = a);
        var p = uo(i, f, s);
        p !== null && (lr(p, i, s, u), im(p, i, s)), Go(i, s);
      },
      enqueueReplaceState: function(e, t, a) {
        var i = ma(e), u = ia(), s = mo(i), f = eu(u, s);
        f.tag = tC, f.payload = t, a != null && (Om(a, "replaceState"), f.callback = a);
        var p = uo(i, f, s);
        p !== null && (lr(p, i, s, u), im(p, i, s)), Go(i, s);
      },
      enqueueForceUpdate: function(e, t) {
        var a = ma(e), i = ia(), u = mo(a), s = eu(i, u);
        s.tag = nm, t != null && (Om(t, "forceUpdate"), s.callback = t);
        var f = uo(a, s, u);
        f !== null && (lr(f, a, u, i), im(f, a, u)), pc(a, u);
      }
    };
    function VC(e, t, a, i, u, s, f) {
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
    function Xw(e, t, a) {
      var i = e.stateNode;
      {
        var u = Nt(t) || "Component", s = i.render;
        s || (t.prototype && typeof t.prototype.render == "function" ? S("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", u) : S("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", u)), i.getInitialState && !i.getInitialState.isReactClassApproved && !i.state && S("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", u), i.getDefaultProps && !i.getDefaultProps.isReactClassApproved && S("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", u), i.propTypes && S("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", u), i.contextType && S("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", u), t.childContextTypes && !Tp.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
        // this one.
        (e.mode & ut) === De && (Tp.add(t), S(`%s uses the legacy childContextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() instead

.Learn more about this warning here: https://reactjs.org/link/legacy-context`, u)), t.contextTypes && !Tp.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
        // this one.
        (e.mode & ut) === De && (Tp.add(t), S(`%s uses the legacy contextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() with static contextType instead.

Learn more about this warning here: https://reactjs.org/link/legacy-context`, u)), i.contextTypes && S("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", u), t.contextType && t.contextTypes && !OS.has(t) && (OS.add(t), S("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", u)), typeof i.componentShouldUpdate == "function" && S("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", u), t.prototype && t.prototype.isPureReactComponent && typeof i.shouldComponentUpdate < "u" && S("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", Nt(t) || "A pure component"), typeof i.componentDidUnmount == "function" && S("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", u), typeof i.componentDidReceiveProps == "function" && S("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", u), typeof i.componentWillRecieveProps == "function" && S("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", u), typeof i.UNSAFE_componentWillRecieveProps == "function" && S("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", u);
        var f = i.props !== a;
        i.props !== void 0 && f && S("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", u, u), i.defaultProps && S("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", u, u), typeof i.getSnapshotBeforeUpdate == "function" && typeof i.componentDidUpdate != "function" && !bS.has(t) && (bS.add(t), S("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", Nt(t))), typeof i.getDerivedStateFromProps == "function" && S("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", u), typeof i.getDerivedStateFromError == "function" && S("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", u), typeof t.getSnapshotBeforeUpdate == "function" && S("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", u);
        var p = i.state;
        p && (typeof p != "object" || Vn(p)) && S("%s.state: must be set to an object or null", u), typeof i.getChildContext == "function" && typeof t.childContextTypes != "object" && S("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", u);
      }
    }
    function jC(e, t) {
      t.updater = NS, e.stateNode = t, xu(t, e), t._reactInternalInstance = RS;
    }
    function BC(e, t, a) {
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
        s = In(f);
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
      jC(e, E);
      {
        if (typeof t.getDerivedStateFromProps == "function" && _ === null) {
          var b = Nt(t) || "Component";
          wS.has(b) || (wS.add(b), S("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", b, E.state === null ? "null" : "undefined", b));
        }
        if (typeof t.getDerivedStateFromProps == "function" || typeof E.getSnapshotBeforeUpdate == "function") {
          var U = null, H = null, j = null;
          if (typeof E.componentWillMount == "function" && E.componentWillMount.__suppressDeprecationWarning !== !0 ? U = "componentWillMount" : typeof E.UNSAFE_componentWillMount == "function" && (U = "UNSAFE_componentWillMount"), typeof E.componentWillReceiveProps == "function" && E.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? H = "componentWillReceiveProps" : typeof E.UNSAFE_componentWillReceiveProps == "function" && (H = "UNSAFE_componentWillReceiveProps"), typeof E.componentWillUpdate == "function" && E.componentWillUpdate.__suppressDeprecationWarning !== !0 ? j = "componentWillUpdate" : typeof E.UNSAFE_componentWillUpdate == "function" && (j = "UNSAFE_componentWillUpdate"), U !== null || H !== null || j !== null) {
            var de = Nt(t) || "Component", je = typeof t.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
            DS.has(de) || (DS.add(de), S(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`, de, je, U !== null ? `
  ` + U : "", H !== null ? `
  ` + H : "", j !== null ? `
  ` + j : ""));
          }
        }
      }
      return i && OE(e, u, s), E;
    }
    function Kw(e, t) {
      var a = t.state;
      typeof t.componentWillMount == "function" && t.componentWillMount(), typeof t.UNSAFE_componentWillMount == "function" && t.UNSAFE_componentWillMount(), a !== t.state && (S("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", et(e) || "Component"), NS.enqueueReplaceState(t, t.state, null));
    }
    function PC(e, t, a, i) {
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
      Xw(e, t, a);
      var u = e.stateNode;
      u.props = a, u.state = e.memoizedState, u.refs = {}, $g(e);
      var s = t.contextType;
      if (typeof s == "object" && s !== null)
        u.context = In(s);
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
      if (typeof v == "function" && (MS(e, t, v, a), u.state = e.memoizedState), typeof t.getDerivedStateFromProps != "function" && typeof u.getSnapshotBeforeUpdate != "function" && (typeof u.UNSAFE_componentWillMount == "function" || typeof u.componentWillMount == "function") && (Kw(e, u), lm(e, a, u, i), u.state = e.memoizedState), typeof u.componentDidMount == "function") {
        var g = nt;
        g |= Nr, (e.mode & ta) !== De && (g |= Ur), e.flags |= g;
      }
    }
    function Zw(e, t, a, i) {
      var u = e.stateNode, s = e.memoizedProps;
      u.props = s;
      var f = u.context, p = t.contextType, v = Ia;
      if (typeof p == "object" && p !== null)
        v = In(p);
      else {
        var g = uf(e, t, !0);
        v = of(e, g);
      }
      var E = t.getDerivedStateFromProps, _ = typeof E == "function" || typeof u.getSnapshotBeforeUpdate == "function";
      !_ && (typeof u.UNSAFE_componentWillReceiveProps == "function" || typeof u.componentWillReceiveProps == "function") && (s !== a || f !== v) && PC(e, u, a, v), rC();
      var b = e.memoizedState, U = u.state = b;
      if (lm(e, a, u, i), U = e.memoizedState, s === a && b === U && !Bh() && !um()) {
        if (typeof u.componentDidMount == "function") {
          var H = nt;
          H |= Nr, (e.mode & ta) !== De && (H |= Ur), e.flags |= H;
        }
        return !1;
      }
      typeof E == "function" && (MS(e, t, E, a), U = e.memoizedState);
      var j = um() || VC(e, t, s, a, b, U, v);
      if (j) {
        if (!_ && (typeof u.UNSAFE_componentWillMount == "function" || typeof u.componentWillMount == "function") && (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function") {
          var de = nt;
          de |= Nr, (e.mode & ta) !== De && (de |= Ur), e.flags |= de;
        }
      } else {
        if (typeof u.componentDidMount == "function") {
          var je = nt;
          je |= Nr, (e.mode & ta) !== De && (je |= Ur), e.flags |= je;
        }
        e.memoizedProps = a, e.memoizedState = U;
      }
      return u.props = a, u.state = U, u.context = v, j;
    }
    function Jw(e, t, a, i, u) {
      var s = t.stateNode;
      nC(e, t);
      var f = t.memoizedProps, p = t.type === t.elementType ? f : Ni(t.type, f);
      s.props = p;
      var v = t.pendingProps, g = s.context, E = a.contextType, _ = Ia;
      if (typeof E == "object" && E !== null)
        _ = In(E);
      else {
        var b = uf(t, a, !0);
        _ = of(t, b);
      }
      var U = a.getDerivedStateFromProps, H = typeof U == "function" || typeof s.getSnapshotBeforeUpdate == "function";
      !H && (typeof s.UNSAFE_componentWillReceiveProps == "function" || typeof s.componentWillReceiveProps == "function") && (f !== v || g !== _) && PC(t, s, i, _), rC();
      var j = t.memoizedState, de = s.state = j;
      if (lm(t, i, s, u), de = t.memoizedState, f === v && j === de && !Bh() && !um() && !ke)
        return typeof s.componentDidUpdate == "function" && (f !== e.memoizedProps || j !== e.memoizedState) && (t.flags |= nt), typeof s.getSnapshotBeforeUpdate == "function" && (f !== e.memoizedProps || j !== e.memoizedState) && (t.flags |= ya), !1;
      typeof U == "function" && (MS(t, a, U, i), de = t.memoizedState);
      var je = um() || VC(t, a, p, i, j, de, _) || // TODO: In some cases, we'll end up checking if context has changed twice,
      // both before and after `shouldComponentUpdate` has been called. Not ideal,
      // but I'm loath to refactor this function. This only happens for memoized
      // components so it's not that common.
      ke;
      return je ? (!H && (typeof s.UNSAFE_componentWillUpdate == "function" || typeof s.componentWillUpdate == "function") && (typeof s.componentWillUpdate == "function" && s.componentWillUpdate(i, de, _), typeof s.UNSAFE_componentWillUpdate == "function" && s.UNSAFE_componentWillUpdate(i, de, _)), typeof s.componentDidUpdate == "function" && (t.flags |= nt), typeof s.getSnapshotBeforeUpdate == "function" && (t.flags |= ya)) : (typeof s.componentDidUpdate == "function" && (f !== e.memoizedProps || j !== e.memoizedState) && (t.flags |= nt), typeof s.getSnapshotBeforeUpdate == "function" && (f !== e.memoizedProps || j !== e.memoizedState) && (t.flags |= ya), t.memoizedProps = i, t.memoizedState = de), s.props = i, s.state = de, s.context = _, je;
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
    function eb(e, t) {
      return !0;
    }
    function AS(e, t) {
      try {
        var a = eb(e, t);
        if (a === !1)
          return;
        var i = t.value, u = t.source, s = t.stack, f = s !== null ? s : "";
        if (i != null && i._suppressLogging) {
          if (e.tag === ce)
            return;
          console.error(i);
        }
        var p = u ? et(u) : null, v = p ? "The above error occurred in the <" + p + "> component:" : "The above error occurred in one of your React components:", g;
        if (e.tag === $)
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
    var tb = typeof WeakMap == "function" ? WeakMap : Map;
    function $C(e, t, a) {
      var i = eu($t, a);
      i.tag = Bg, i.payload = {
        element: null
      };
      var u = t.value;
      return i.callback = function() {
        WD(u), AS(e, t);
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
          eT(e), AS(e, t);
        };
      }
      var f = e.stateNode;
      return f !== null && typeof f.componentDidCatch == "function" && (i.callback = function() {
        eT(e), AS(e, t), typeof u != "function" && ID(this);
        var v = t.value, g = t.stack;
        this.componentDidCatch(v, {
          componentStack: g !== null ? g : ""
        }), typeof u != "function" && (jr(e.lanes, Ae) || S("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", et(e) || "Unknown"));
      }), i;
    }
    function YC(e, t, a) {
      var i = e.pingCache, u;
      if (i === null ? (i = e.pingCache = new tb(), u = /* @__PURE__ */ new Set(), i.set(t, u)) : (u = i.get(t), u === void 0 && (u = /* @__PURE__ */ new Set(), i.set(t, u))), !u.has(a)) {
        u.add(a);
        var s = GD.bind(null, e, t, a);
        ea && Vp(e, a), t.then(s, s);
      }
    }
    function nb(e, t, a, i) {
      var u = e.updateQueue;
      if (u === null) {
        var s = /* @__PURE__ */ new Set();
        s.add(a), e.updateQueue = s;
      } else
        u.add(a);
    }
    function rb(e, t) {
      var a = e.tag;
      if ((e.mode & Oe) === De && (a === se || a === Ie || a === Xe)) {
        var i = e.alternate;
        i ? (e.updateQueue = i.updateQueue, e.memoizedState = i.memoizedState, e.lanes = i.lanes) : (e.updateQueue = null, e.memoizedState = null);
      }
    }
    function IC(e) {
      var t = e;
      do {
        if (t.tag === Ne && Fw(t))
          return t;
        t = t.return;
      } while (t !== null);
      return null;
    }
    function QC(e, t, a, i, u) {
      if ((e.mode & Oe) === De) {
        if (e === t)
          e.flags |= Bn;
        else {
          if (e.flags |= Qe, a.flags |= Io, a.flags &= ~(tc | Kr), a.tag === ce) {
            var s = a.alternate;
            if (s === null)
              a.tag = Jt;
            else {
              var f = eu($t, Ae);
              f.tag = nm, uo(a, f, Ae);
            }
          }
          a.lanes = tt(a.lanes, Ae);
        }
        return e;
      }
      return e.flags |= Bn, e.lanes = u, e;
    }
    function ab(e, t, a, i, u) {
      if (a.flags |= Kr, ea && Vp(e, u), i !== null && typeof i == "object" && typeof i.then == "function") {
        var s = i;
        rb(a), Er() && a.mode & Oe && FE();
        var f = IC(t);
        if (f !== null) {
          f.flags &= ~un, QC(f, t, a, e, u), f.mode & Oe && YC(e, s, u), nb(f, e, s);
          return;
        } else {
          if (!wd(u)) {
            YC(e, s, u), m0();
            return;
          }
          var p = new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
          i = p;
        }
      } else if (Er() && a.mode & Oe) {
        FE();
        var v = IC(t);
        if (v !== null) {
          (v.flags & Bn) === He && (v.flags |= un), QC(v, t, a, e, u), kg(ws(i, a));
          return;
        }
      }
      i = ws(i, a), FD(i);
      var g = t;
      do {
        switch (g.tag) {
          case $: {
            var E = i;
            g.flags |= Bn;
            var _ = Hu(u);
            g.lanes = tt(g.lanes, _);
            var b = $C(g, E, _);
            Yg(g, b);
            return;
          }
          case ce:
            var U = i, H = g.type, j = g.stateNode;
            if ((g.flags & Qe) === He && (typeof H.getDerivedStateFromError == "function" || j !== null && typeof j.componentDidCatch == "function" && !I1(j))) {
              g.flags |= Bn;
              var de = Hu(u);
              g.lanes = tt(g.lanes, de);
              var je = FS(g, U, de);
              Yg(g, je);
              return;
            }
            break;
        }
        g = g.return;
      } while (g !== null);
    }
    function ib() {
      return null;
    }
    var Rp = y.ReactCurrentOwner, Ui = !1, HS, xp, VS, jS, BS, bs, PS, Lm, wp;
    HS = {}, xp = {}, VS = {}, jS = {}, BS = {}, bs = !1, PS = {}, Lm = {}, wp = {};
    function ra(e, t, a, i) {
      e === null ? t.child = qE(t, null, a, i) : t.child = df(t, e.child, a, i);
    }
    function lb(e, t, a, i) {
      t.child = df(t, e.child, null, i), t.child = df(t, null, a, i);
    }
    function WC(e, t, a, i, u) {
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
      return Fr(), e !== null && !Ui ? (sC(e, t, u), tu(e, t, u)) : (Er() && g && Rg(t), t.flags |= Gi, ra(e, t, v, u), t.child);
    }
    function GC(e, t, a, i, u) {
      if (e === null) {
        var s = a.type;
        if (f_(s) && a.compare === null && // SimpleMemoComponent codepath doesn't resolve outer props either.
        a.defaultProps === void 0) {
          var f = s;
          return f = kf(s), t.tag = Xe, t.type = f, IS(t, s), qC(e, t, f, i, u);
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
      var b = e.child, U = KS(e, u);
      if (!U) {
        var H = b.memoizedProps, j = a.compare;
        if (j = j !== null ? j : Pe, j(H, i) && e.ref === t.ref)
          return tu(e, t, u);
      }
      t.flags |= Gi;
      var de = Ls(b, i);
      return de.ref = t.ref, de.return = t, t.child = de, de;
    }
    function qC(e, t, a, i, u) {
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
    function XC(e, t, a) {
      var i = t.pendingProps, u = i.children, s = e !== null ? e.memoizedState : null;
      if (i.mode === "hidden" || fe)
        if ((t.mode & Oe) === De) {
          var f = {
            baseLanes: I,
            cachePool: null,
            transitions: null
          };
          t.memoizedState = f, Ym(t, a);
        } else if (jr(a, dr)) {
          var _ = {
            baseLanes: I,
            cachePool: null,
            transitions: null
          };
          t.memoizedState = _;
          var b = s !== null ? s.baseLanes : a;
          Ym(t, b);
        } else {
          var p = null, v;
          if (s !== null) {
            var g = s.baseLanes;
            v = tt(g, a);
          } else
            v = a;
          t.lanes = t.childLanes = dr;
          var E = {
            baseLanes: v,
            cachePool: p,
            transitions: null
          };
          return t.memoizedState = E, t.updateQueue = null, Ym(t, v), null;
        }
      else {
        var U;
        s !== null ? (U = tt(s.baseLanes, a), t.memoizedState = null) : U = a, Ym(t, U);
      }
      return ra(e, t, u, a), t.child;
    }
    function ub(e, t, a) {
      var i = t.pendingProps;
      return ra(e, t, i, a), t.child;
    }
    function ob(e, t, a) {
      var i = t.pendingProps.children;
      return ra(e, t, i, a), t.child;
    }
    function sb(e, t, a) {
      {
        t.flags |= nt;
        {
          var i = t.stateNode;
          i.effectDuration = 0, i.passiveEffectDuration = 0;
        }
      }
      var u = t.pendingProps, s = u.children;
      return ra(e, t, s, a), t.child;
    }
    function KC(e, t) {
      var a = t.ref;
      (e === null && a !== null || e !== null && e.ref !== a) && (t.flags |= Mr, t.flags |= dd);
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
      return Fr(), e !== null && !Ui ? (sC(e, t, u), tu(e, t, u)) : (Er() && g && Rg(t), t.flags |= Gi, ra(e, t, v, u), t.child);
    }
    function ZC(e, t, a, i, u) {
      {
        switch (b_(t)) {
          case !1: {
            var s = t.stateNode, f = t.type, p = new f(t.memoizedProps, s.context), v = p.state;
            s.updater.enqueueSetState(s, v, null);
            break;
          }
          case !0: {
            t.flags |= Qe, t.flags |= Bn;
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
      var U;
      ul(a) ? (U = !0, $h(t)) : U = !1, vf(t, u);
      var H = t.stateNode, j;
      H === null ? (Nm(e, t), BC(t, a, i), US(t, a, i, u), j = !0) : e === null ? j = Zw(t, a, i, u) : j = Jw(e, t, a, i, u);
      var de = YS(e, t, a, j, U, u);
      {
        var je = t.stateNode;
        j && je.props !== i && (bs || S("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", et(t) || "a component"), bs = !0);
      }
      return de;
    }
    function YS(e, t, a, i, u, s) {
      KC(e, t);
      var f = (t.flags & Qe) !== He;
      if (!i && !f)
        return u && NE(t, a, !1), tu(e, t, s);
      var p = t.stateNode;
      Rp.current = t;
      var v;
      if (f && typeof a.getDerivedStateFromError != "function")
        v = null, AC();
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
        Fr();
      }
      return t.flags |= Gi, e !== null && f ? lb(e, t, v, s) : ra(e, t, v, s), t.memoizedState = p.state, u && NE(t, a, !0), t.child;
    }
    function JC(e) {
      var t = e.stateNode;
      t.pendingContext ? LE(e, t.pendingContext, t.pendingContext !== t.context) : t.context && LE(e, t.context, !1), Ig(e, t.containerInfo);
    }
    function cb(e, t, a) {
      if (JC(t), e === null)
        throw new Error("Should have a current fiber. This is a bug in React.");
      var i = t.pendingProps, u = t.memoizedState, s = u.element;
      nC(e, t), lm(t, i, null, a);
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
          return e1(e, t, p, a, E);
        } else if (p !== s) {
          var _ = ws(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t);
          return e1(e, t, p, a, _);
        } else {
          pw(t);
          var b = qE(t, null, p, a);
          t.child = b;
          for (var U = b; U; )
            U.flags = U.flags & ~Qt | ga, U = U.sibling;
        }
      } else {
        if (ff(), p === s)
          return tu(e, t, a);
        ra(e, t, p, a);
      }
      return t.child;
    }
    function e1(e, t, a, i, u) {
      return ff(), kg(u), t.flags |= un, ra(e, t, a, i), t.child;
    }
    function fb(e, t, a) {
      lC(t), e === null && _g(t);
      var i = t.type, u = t.pendingProps, s = e !== null ? e.memoizedProps : null, f = u.children, p = sg(i, u);
      return p ? f = null : s !== null && sg(i, s) && (t.flags |= Ot), KC(e, t), ra(e, t, f, a), t.child;
    }
    function db(e, t) {
      return e === null && _g(t), null;
    }
    function pb(e, t, a, i) {
      Nm(e, t);
      var u = t.pendingProps, s = a, f = s._payload, p = s._init, v = p(f);
      t.type = v;
      var g = t.tag = d_(v), E = Ni(v, u), _;
      switch (g) {
        case se:
          return IS(t, v), t.type = v = kf(v), _ = $S(null, t, v, E, i), _;
        case ce:
          return t.type = v = C0(v), _ = ZC(null, t, v, E, i), _;
        case Ie:
          return t.type = v = T0(v), _ = WC(null, t, v, E, i), _;
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
          return _ = GC(
            null,
            t,
            v,
            Ni(v.type, E),
            // The inner type can have defaults too
            i
          ), _;
        }
      }
      var U = "";
      throw v !== null && typeof v == "object" && v.$$typeof === $e && (U = " Did you wrap a component in React.lazy() more than once?"), new Error("Element type is invalid. Received a promise that resolves to: " + v + ". " + ("Lazy element type must resolve to a class or function." + U));
    }
    function vb(e, t, a, i, u) {
      Nm(e, t), t.tag = ce;
      var s;
      return ul(a) ? (s = !0, $h(t)) : s = !1, vf(t, u), BC(t, a, i), US(t, a, i, u), YS(null, t, a, !0, s, u);
    }
    function hb(e, t, a, i) {
      Nm(e, t);
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
      if (Fr(), t.flags |= Gi, typeof p == "object" && p !== null && typeof p.render == "function" && p.$$typeof === void 0) {
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
        t.tag = ce, t.memoizedState = null, t.updateQueue = null;
        var b = !1;
        return ul(a) ? (b = !0, $h(t)) : b = !1, t.memoizedState = p.state !== null && p.state !== void 0 ? p.state : null, $g(t), jC(t, p), US(t, a, u, i), YS(null, t, a, !0, b, i);
      } else {
        if (t.tag = se, t.mode & ut) {
          Cn(!0);
          try {
            p = Ef(null, t, a, u, s, i), v = Cf();
          } finally {
            Cn(!1);
          }
        }
        return Er() && v && Rg(t), ra(null, t, p, i), IS(t, a), t.child;
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
        cachePool: ib(),
        transitions: null
      };
    }
    function mb(e, t) {
      var a = null;
      return {
        baseLanes: tt(e.baseLanes, t),
        cachePool: a,
        transitions: e.transitions
      };
    }
    function yb(e, t, a, i) {
      if (t !== null) {
        var u = t.memoizedState;
        if (u === null)
          return !1;
      }
      return Gg(e, vp);
    }
    function gb(e, t) {
      return ts(e.childLanes, t);
    }
    function t1(e, t, a) {
      var i = t.pendingProps;
      D_(t) && (t.flags |= Qe);
      var u = Li.current, s = !1, f = (t.flags & Qe) !== He;
      if (f || yb(u, e) ? (s = !0, t.flags &= ~Qe) : (e === null || e.memoizedState !== null) && (u = Aw(u, oC)), u = mf(u), so(t, u), e === null) {
        _g(t);
        var p = t.memoizedState;
        if (p !== null) {
          var v = p.dehydrated;
          if (v !== null)
            return Rb(t, v);
        }
        var g = i.children, E = i.fallback;
        if (s) {
          var _ = Sb(t, g, E, a), b = t.child;
          return b.memoizedState = WS(a), t.memoizedState = QS, _;
        } else
          return GS(t, g);
      } else {
        var U = e.memoizedState;
        if (U !== null) {
          var H = U.dehydrated;
          if (H !== null)
            return xb(e, t, f, i, H, U, a);
        }
        if (s) {
          var j = i.fallback, de = i.children, je = Cb(e, t, de, j, a), Le = t.child, yt = e.child.memoizedState;
          return Le.memoizedState = yt === null ? WS(a) : mb(yt, a), Le.childLanes = gb(e, a), t.memoizedState = QS, je;
        } else {
          var ft = i.children, O = Eb(e, t, ft, a);
          return t.memoizedState = null, O;
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
    function Sb(e, t, a, i) {
      var u = e.mode, s = e.child, f = {
        mode: "hidden",
        children: t
      }, p, v;
      return (u & Oe) === De && s !== null ? (p = s, p.childLanes = I, p.pendingProps = f, e.mode & We && (p.actualDuration = 0, p.actualStartTime = -1, p.selfBaseDuration = 0, p.treeBaseDuration = 0), v = go(a, u, i, null)) : (p = qS(f, u), v = go(a, u, i, null)), p.return = e, v.return = e, p.sibling = v, e.child = p, v;
    }
    function qS(e, t, a) {
      return nT(e, t, I, null);
    }
    function n1(e, t) {
      return Ls(e, t);
    }
    function Eb(e, t, a, i) {
      var u = e.child, s = u.sibling, f = n1(u, {
        mode: "visible",
        children: a
      });
      if ((t.mode & Oe) === De && (f.lanes = i), f.return = t, f.sibling = null, s !== null) {
        var p = t.deletions;
        p === null ? (t.deletions = [s], t.flags |= Dt) : p.push(s);
      }
      return t.child = f, f;
    }
    function Cb(e, t, a, i, u) {
      var s = t.mode, f = e.child, p = f.sibling, v = {
        mode: "hidden",
        children: a
      }, g;
      if (
        // In legacy mode, we commit the primary tree as if it successfully
        // completed, even though it's in an inconsistent state.
        (s & Oe) === De && // Make sure we're on the second pass, i.e. the primary child fragment was
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
        g = n1(f, v), g.subtreeFlags = f.subtreeFlags & Xn;
      var _;
      return p !== null ? _ = Ls(p, i) : (_ = go(i, s, u, null), _.flags |= Qt), _.return = t, g.return = t, g.sibling = _, t.child = g, _;
    }
    function Mm(e, t, a, i) {
      i !== null && kg(i), df(t, e.child, null, a);
      var u = t.pendingProps, s = u.children, f = GS(t, s);
      return f.flags |= Qt, t.memoizedState = null, f;
    }
    function Tb(e, t, a, i, u) {
      var s = t.mode, f = {
        mode: "visible",
        children: a
      }, p = qS(f, s), v = go(i, s, u, null);
      return v.flags |= Qt, p.return = t, v.return = t, p.sibling = v, t.child = p, (t.mode & Oe) !== De && df(t, e.child, null, u), v;
    }
    function Rb(e, t, a) {
      return (e.mode & Oe) === De ? (S("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."), e.lanes = Ae) : pg(t) ? e.lanes = Ri : e.lanes = dr, null;
    }
    function xb(e, t, a, i, u, s, f) {
      if (a)
        if (t.flags & un) {
          t.flags &= ~un;
          var O = zS(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));
          return Mm(e, t, f, O);
        } else {
          if (t.memoizedState !== null)
            return t.child = e.child, t.flags |= Qe, null;
          var B = i.children, L = i.fallback, K = Tb(e, t, B, L, f), ye = t.child;
          return ye.memoizedState = WS(f), t.memoizedState = QS, K;
        }
      else {
        if (fw(), (t.mode & Oe) === De)
          return Mm(
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
            var E = _x(u);
            p = E.digest, v = E.message, g = E.stack;
          }
          var _;
          v ? _ = new Error(v) : _ = new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");
          var b = zS(_, p, g);
          return Mm(e, t, f, b);
        }
        var U = jr(f, e.childLanes);
        if (Ui || U) {
          var H = $m();
          if (H !== null) {
            var j = ah(H, f);
            if (j !== Tn && j !== s.retryLane) {
              s.retryLane = j;
              var de = $t;
              Oa(e, j), lr(H, e, j, de);
            }
          }
          m0();
          var je = zS(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));
          return Mm(e, t, f, je);
        } else if (wE(u)) {
          t.flags |= Qe, t.child = e.child;
          var Le = qD.bind(null, e);
          return kx(u, Le), null;
        } else {
          vw(t, u, s.treeContext);
          var yt = i.children, ft = GS(t, yt);
          return ft.flags |= ga, ft;
        }
      }
    }
    function r1(e, t, a) {
      e.lanes = tt(e.lanes, t);
      var i = e.alternate;
      i !== null && (i.lanes = tt(i.lanes, t)), Vg(e.return, t, a);
    }
    function wb(e, t, a) {
      for (var i = t; i !== null; ) {
        if (i.tag === Ne) {
          var u = i.memoizedState;
          u !== null && r1(i, a, e);
        } else if (i.tag === Et)
          r1(i, a, e);
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
    function bb(e) {
      for (var t = e, a = null; t !== null; ) {
        var i = t.alternate;
        i !== null && cm(i) === null && (a = t), t = t.sibling;
      }
      return a;
    }
    function Db(e) {
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
    function _b(e, t) {
      e !== void 0 && !Lm[e] && (e !== "collapsed" && e !== "hidden" ? (Lm[e] = !0, S('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?', e)) : t !== "forwards" && t !== "backwards" && (Lm[e] = !0, S('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?', e)));
    }
    function a1(e, t) {
      {
        var a = Vn(e), i = !a && typeof qr(e) == "function";
        if (a || i) {
          var u = a ? "array" : "iterable";
          return S("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", u, t, u), !1;
        }
      }
      return !0;
    }
    function kb(e, t) {
      if ((t === "forwards" || t === "backwards") && e !== void 0 && e !== null && e !== !1)
        if (Vn(e)) {
          for (var a = 0; a < e.length; a++)
            if (!a1(e[a], a))
              return;
        } else {
          var i = qr(e);
          if (typeof i == "function") {
            var u = i.call(e);
            if (u)
              for (var s = u.next(), f = 0; !s.done; s = u.next()) {
                if (!a1(s.value, f))
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
    function i1(e, t, a) {
      var i = t.pendingProps, u = i.revealOrder, s = i.tail, f = i.children;
      Db(u), _b(s, u), kb(f, u), ra(e, t, f, a);
      var p = Li.current, v = Gg(p, vp);
      if (v)
        p = qg(p, vp), t.flags |= Qe;
      else {
        var g = e !== null && (e.flags & Qe) !== He;
        g && wb(t, t.child, a), p = mf(p);
      }
      if (so(t, p), (t.mode & Oe) === De)
        t.memoizedState = null;
      else
        switch (u) {
          case "forwards": {
            var E = bb(t.child), _;
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
            var b = null, U = t.child;
            for (t.child = null; U !== null; ) {
              var H = U.alternate;
              if (H !== null && cm(H) === null) {
                t.child = U;
                break;
              }
              var j = U.sibling;
              U.sibling = b, b = U, U = j;
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
    function Ob(e, t, a) {
      Ig(t, t.stateNode.containerInfo);
      var i = t.pendingProps;
      return e === null ? t.child = df(t, null, i, a) : ra(e, t, i, a), t.child;
    }
    var l1 = !1;
    function Lb(e, t, a) {
      var i = t.type, u = i._context, s = t.pendingProps, f = t.memoizedProps, p = s.value;
      {
        "value" in s || l1 || (l1 = !0, S("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"));
        var v = t.type.propTypes;
        v && _i(v, s, "prop", "Context.Provider");
      }
      if (ZE(t, u, p), f !== null) {
        var g = f.value;
        if (Te(g, p)) {
          if (f.children === s.children && !Bh())
            return tu(e, t, a);
        } else
          Dw(t, u, a);
      }
      var E = s.children;
      return ra(e, t, E, a), t.child;
    }
    var u1 = !1;
    function Mb(e, t, a) {
      var i = t.type;
      i._context === void 0 ? i !== i.Consumer && (u1 || (u1 = !0, S("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))) : i = i._context;
      var u = t.pendingProps, s = u.children;
      typeof s != "function" && S("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), vf(t, a);
      var f = In(i);
      _u(t);
      var p;
      return Rp.current = t, ja(!0), p = s(f), ja(!1), Fr(), t.flags |= Gi, ra(e, t, p, a), t.child;
    }
    function bp() {
      Ui = !0;
    }
    function Nm(e, t) {
      (t.mode & Oe) === De && e !== null && (e.alternate = null, t.alternate = null, t.flags |= Qt);
    }
    function tu(e, t, a) {
      return e !== null && (t.dependencies = e.dependencies), AC(), Hp(t.lanes), jr(a, t.childLanes) ? (ww(e, t), t.child) : null;
    }
    function Nb(e, t, a) {
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
      return !!jr(a, t);
    }
    function Ub(e, t, a) {
      switch (t.tag) {
        case $:
          JC(t), t.stateNode, ff();
          break;
        case re:
          lC(t);
          break;
        case ce: {
          var i = t.type;
          ul(i) && $h(t);
          break;
        }
        case ue:
          Ig(t, t.stateNode.containerInfo);
          break;
        case Ee: {
          var u = t.memoizedProps.value, s = t.type._context;
          ZE(t, s, u);
          break;
        }
        case ot:
          {
            var f = jr(a, t.childLanes);
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
            if (jr(a, E))
              return t1(e, t, a);
            so(t, mf(Li.current));
            var _ = tu(e, t, a);
            return _ !== null ? _.sibling : null;
          } else
            so(t, mf(Li.current));
          break;
        }
        case Et: {
          var b = (e.flags & Qe) !== He, U = jr(a, t.childLanes);
          if (b) {
            if (U)
              return i1(e, t, a);
            t.flags |= Qe;
          }
          var H = t.memoizedState;
          if (H !== null && (H.rendering = null, H.tail = null, H.lastEffect = null), so(t, Li.current), U)
            break;
          return null;
        }
        case oe:
        case Fe:
          return t.lanes = I, XC(e, t, a);
      }
      return tu(e, t, a);
    }
    function o1(e, t, a) {
      if (t._debugNeedsRemount && e !== null)
        return Nb(e, t, D0(t.type, t.key, t.pendingProps, t._debugOwner || null, t.mode, t.lanes));
      if (e !== null) {
        var i = e.memoizedProps, u = t.pendingProps;
        if (i !== u || Bh() || // Force a re-render if the implementation changed due to hot reload:
        t.type !== e.type)
          Ui = !0;
        else {
          var s = KS(e, a);
          if (!s && // If this is the second pass of an error or suspense boundary, there
          // may not be work scheduled on `current`, so we check for this flag.
          (t.flags & Qe) === He)
            return Ui = !1, Ub(e, t, a);
          (e.flags & Io) !== He ? Ui = !0 : Ui = !1;
        }
      } else if (Ui = !1, Er() && iw(t)) {
        var f = t.index, p = lw();
        AE(t, p, f);
      }
      switch (t.lanes = I, t.tag) {
        case Me:
          return hb(e, t, t.type, a);
        case Yt: {
          var v = t.elementType;
          return pb(e, t, v, a);
        }
        case se: {
          var g = t.type, E = t.pendingProps, _ = t.elementType === g ? E : Ni(g, E);
          return $S(e, t, g, _, a);
        }
        case ce: {
          var b = t.type, U = t.pendingProps, H = t.elementType === b ? U : Ni(b, U);
          return ZC(e, t, b, H, a);
        }
        case $:
          return cb(e, t, a);
        case re:
          return fb(e, t, a);
        case xe:
          return db(e, t);
        case Ne:
          return t1(e, t, a);
        case ue:
          return Ob(e, t, a);
        case Ie: {
          var j = t.type, de = t.pendingProps, je = t.elementType === j ? de : Ni(j, de);
          return WC(e, t, j, je, a);
        }
        case Ze:
          return ub(e, t, a);
        case Ge:
          return ob(e, t, a);
        case ot:
          return sb(e, t, a);
        case Ee:
          return Lb(e, t, a);
        case wt:
          return Mb(e, t, a);
        case Ct: {
          var Le = t.type, yt = t.pendingProps, ft = Ni(Le, yt);
          if (t.type !== t.elementType) {
            var O = Le.propTypes;
            O && _i(
              O,
              ft,
              // Resolved for outer only
              "prop",
              Nt(Le)
            );
          }
          return ft = Ni(Le.type, ft), GC(e, t, Le, ft, a);
        }
        case Xe:
          return qC(e, t, t.type, t.pendingProps, a);
        case Jt: {
          var B = t.type, L = t.pendingProps, K = t.elementType === B ? L : Ni(B, L);
          return vb(e, t, B, K, a);
        }
        case Et:
          return i1(e, t, a);
        case Ve:
          break;
        case oe:
          return XC(e, t, a);
      }
      throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function Tf(e) {
      e.flags |= nt;
    }
    function s1(e) {
      e.flags |= Mr, e.flags |= dd;
    }
    var c1, ZS, f1, d1;
    c1 = function(e, t, a, i) {
      for (var u = t.child; u !== null; ) {
        if (u.tag === re || u.tag === xe)
          nx(e, u.stateNode);
        else if (u.tag !== ue) {
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
    }, f1 = function(e, t, a, i, u) {
      var s = e.memoizedProps;
      if (s !== i) {
        var f = t.stateNode, p = Qg(), v = ax(f, a, s, i, u, p);
        t.updateQueue = v, v && Tf(t);
      }
    }, d1 = function(e, t, a, i) {
      a !== i && Tf(t);
    };
    function Dp(e, t) {
      if (!Er())
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
    function Tr(e) {
      var t = e.alternate !== null && e.alternate.child === e.child, a = I, i = He;
      if (t) {
        if ((e.mode & We) !== De) {
          for (var v = e.selfBaseDuration, g = e.child; g !== null; )
            a = tt(a, tt(g.lanes, g.childLanes)), i |= g.subtreeFlags & Xn, i |= g.flags & Xn, v += g.treeBaseDuration, g = g.sibling;
          e.treeBaseDuration = v;
        } else
          for (var E = e.child; E !== null; )
            a = tt(a, tt(E.lanes, E.childLanes)), i |= E.subtreeFlags & Xn, i |= E.flags & Xn, E.return = e, E = E.sibling;
        e.subtreeFlags |= i;
      } else {
        if ((e.mode & We) !== De) {
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
    function zb(e, t, a) {
      if (Sw() && (t.mode & Oe) !== De && (t.flags & Qe) === He)
        return $E(t), ff(), t.flags |= un | Kr | Bn, !1;
      var i = Gh(t);
      if (a !== null && a.dehydrated !== null)
        if (e === null) {
          if (!i)
            throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
          if (yw(t), Tr(t), (t.mode & We) !== De) {
            var u = a !== null;
            if (u) {
              var s = t.child;
              s !== null && (t.treeBaseDuration -= s.treeBaseDuration);
            }
          }
          return !1;
        } else {
          if (ff(), (t.flags & Qe) === He && (t.memoizedState = null), t.flags |= nt, Tr(t), (t.mode & We) !== De) {
            var f = a !== null;
            if (f) {
              var p = t.child;
              p !== null && (t.treeBaseDuration -= p.treeBaseDuration);
            }
          }
          return !1;
        }
      else
        return YE(), !0;
    }
    function p1(e, t, a) {
      var i = t.pendingProps;
      switch (xg(t), t.tag) {
        case Me:
        case Yt:
        case Xe:
        case se:
        case Ie:
        case Ze:
        case Ge:
        case ot:
        case wt:
        case Ct:
          return Tr(t), null;
        case ce: {
          var u = t.type;
          return ul(u) && Ph(t), Tr(t), null;
        }
        case $: {
          var s = t.stateNode;
          if (hf(t), Eg(t), Kg(), s.pendingContext && (s.context = s.pendingContext, s.pendingContext = null), e === null || e.child === null) {
            var f = Gh(t);
            if (f)
              Tf(t);
            else if (e !== null) {
              var p = e.memoizedState;
              // Check if this is a client root
              (!p.isDehydrated || // Check if we reverted to client rendering (e.g. due to an error)
              (t.flags & un) !== He) && (t.flags |= ya, YE());
            }
          }
          return ZS(e, t), Tr(t), null;
        }
        case re: {
          Wg(t);
          var v = iC(), g = t.type;
          if (e !== null && t.stateNode != null)
            f1(e, t, g, i, v), e.ref !== t.ref && s1(t);
          else {
            if (!i) {
              if (t.stateNode === null)
                throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
              return Tr(t), null;
            }
            var E = Qg(), _ = Gh(t);
            if (_)
              hw(t, v, E) && Tf(t);
            else {
              var b = tx(g, i, v, E, t);
              c1(b, t, !1, !1), t.stateNode = b, rx(b, g, i, v) && Tf(t);
            }
            t.ref !== null && s1(t);
          }
          return Tr(t), null;
        }
        case xe: {
          var U = i;
          if (e && t.stateNode != null) {
            var H = e.memoizedProps;
            d1(e, t, H, U);
          } else {
            if (typeof U != "string" && t.stateNode === null)
              throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
            var j = iC(), de = Qg(), je = Gh(t);
            je ? mw(t) && Tf(t) : t.stateNode = ix(U, j, de, t);
          }
          return Tr(t), null;
        }
        case Ne: {
          yf(t);
          var Le = t.memoizedState;
          if (e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
            var yt = zb(e, t, Le);
            if (!yt)
              return t.flags & Bn ? t : null;
          }
          if ((t.flags & Qe) !== He)
            return t.lanes = a, (t.mode & We) !== De && TS(t), t;
          var ft = Le !== null, O = e !== null && e.memoizedState !== null;
          if (ft !== O && ft) {
            var B = t.child;
            if (B.flags |= qi, (t.mode & Oe) !== De) {
              var L = e === null && (t.memoizedProps.unstable_avoidThisFallback !== !0 || !ht);
              L || Gg(Li.current, oC) ? AD() : m0();
            }
          }
          var K = t.updateQueue;
          if (K !== null && (t.flags |= nt), Tr(t), (t.mode & We) !== De && ft) {
            var ye = t.child;
            ye !== null && (t.treeBaseDuration -= ye.treeBaseDuration);
          }
          return null;
        }
        case ue:
          return hf(t), ZS(e, t), e === null && Zx(t.stateNode.containerInfo), Tr(t), null;
        case Ee:
          var ve = t.type._context;
          return Hg(ve, t), Tr(t), null;
        case Jt: {
          var Ye = t.type;
          return ul(Ye) && Ph(t), Tr(t), null;
        }
        case Et: {
          yf(t);
          var Ke = t.memoizedState;
          if (Ke === null)
            return Tr(t), null;
          var Ft = (t.flags & Qe) !== He, Rt = Ke.rendering;
          if (Rt === null)
            if (Ft)
              Dp(Ke, !1);
            else {
              var Mn = HD() && (e === null || (e.flags & Qe) === He);
              if (!Mn)
                for (var xt = t.child; xt !== null; ) {
                  var Rn = cm(xt);
                  if (Rn !== null) {
                    Ft = !0, t.flags |= Qe, Dp(Ke, !1);
                    var Ir = Rn.updateQueue;
                    return Ir !== null && (t.updateQueue = Ir, t.flags |= nt), t.subtreeFlags = He, bw(t, a), so(t, qg(Li.current, vp)), t.child;
                  }
                  xt = xt.sibling;
                }
              Ke.tail !== null && nn() > U1() && (t.flags |= Qe, Ft = !0, Dp(Ke, !1), t.lanes = Wv);
            }
          else {
            if (!Ft) {
              var Dr = cm(Rt);
              if (Dr !== null) {
                t.flags |= Qe, Ft = !0;
                var Wa = Dr.updateQueue;
                if (Wa !== null && (t.updateQueue = Wa, t.flags |= nt), Dp(Ke, !0), Ke.tail === null && Ke.tailMode === "hidden" && !Rt.alternate && !Er())
                  return Tr(t), null;
              } else // The time it took to render last row is greater than the remaining
              // time we have to render. So rendering one more row would likely
              // exceed it.
              nn() * 2 - Ke.renderingStartTime > U1() && a !== dr && (t.flags |= Qe, Ft = !0, Dp(Ke, !1), t.lanes = Wv);
            }
            if (Ke.isBackwards)
              Rt.sibling = t.child, t.child = Rt;
            else {
              var la = Ke.last;
              la !== null ? la.sibling = Rt : t.child = Rt, Ke.last = Rt;
            }
          }
          if (Ke.tail !== null) {
            var ua = Ke.tail;
            Ke.rendering = ua, Ke.tail = ua.sibling, Ke.renderingStartTime = nn(), ua.sibling = null;
            var Qr = Li.current;
            return Ft ? Qr = qg(Qr, vp) : Qr = mf(Qr), so(t, Qr), ua;
          }
          return Tr(t), null;
        }
        case Ve:
          break;
        case oe:
        case Fe: {
          h0(t);
          var lu = t.memoizedState, Of = lu !== null;
          if (e !== null) {
            var $p = e.memoizedState, hl = $p !== null;
            hl !== Of && // LegacyHidden doesn't do any hiding — it only pre-renders.
            !fe && (t.flags |= qi);
          }
          return !Of || (t.mode & Oe) === De ? Tr(t) : jr(vl, dr) && (Tr(t), t.subtreeFlags & (Qt | nt) && (t.flags |= qi)), null;
        }
        case vt:
          return null;
        case st:
          return null;
      }
      throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function Ab(e, t, a) {
      switch (xg(t), t.tag) {
        case ce: {
          var i = t.type;
          ul(i) && Ph(t);
          var u = t.flags;
          return u & Bn ? (t.flags = u & ~Bn | Qe, (t.mode & We) !== De && TS(t), t) : null;
        }
        case $: {
          t.stateNode, hf(t), Eg(t), Kg();
          var s = t.flags;
          return (s & Bn) !== He && (s & Qe) === He ? (t.flags = s & ~Bn | Qe, t) : null;
        }
        case re:
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
          return p & Bn ? (t.flags = p & ~Bn | Qe, (t.mode & We) !== De && TS(t), t) : null;
        }
        case Et:
          return yf(t), null;
        case ue:
          return hf(t), null;
        case Ee:
          var v = t.type._context;
          return Hg(v, t), null;
        case oe:
        case Fe:
          return h0(t), null;
        case vt:
          return null;
        default:
          return null;
      }
    }
    function v1(e, t, a) {
      switch (xg(t), t.tag) {
        case ce: {
          var i = t.type.childContextTypes;
          i != null && Ph(t);
          break;
        }
        case $: {
          t.stateNode, hf(t), Eg(t), Kg();
          break;
        }
        case re: {
          Wg(t);
          break;
        }
        case ue:
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
        case oe:
        case Fe:
          h0(t);
          break;
      }
    }
    var h1 = null;
    h1 = /* @__PURE__ */ new Set();
    var Um = !1, Rr = !1, Fb = typeof WeakSet == "function" ? WeakSet : Set, Re = null, Rf = null, xf = null;
    function Hb(e) {
      Ll(null, function() {
        throw e;
      }), cd();
    }
    var Vb = function(e, t) {
      if (t.props = e.memoizedProps, t.state = e.memoizedState, e.mode & We)
        try {
          dl(), t.componentWillUnmount();
        } finally {
          fl(e);
        }
      else
        t.componentWillUnmount();
    };
    function m1(e, t) {
      try {
        po(er, e);
      } catch (a) {
        qt(e, t, a);
      }
    }
    function JS(e, t, a) {
      try {
        Vb(e, a);
      } catch (i) {
        qt(e, t, i);
      }
    }
    function jb(e, t, a) {
      try {
        a.componentDidMount();
      } catch (i) {
        qt(e, t, i);
      }
    }
    function y1(e, t) {
      try {
        S1(e);
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
            if (en && mr && e.mode & We)
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
    function zm(e, t, a) {
      try {
        a();
      } catch (i) {
        qt(e, t, i);
      }
    }
    var g1 = !1;
    function Bb(e, t) {
      JR(e.containerInfo), Re = t, Pb();
      var a = g1;
      return g1 = !1, a;
    }
    function Pb() {
      for (; Re !== null; ) {
        var e = Re, t = e.child;
        (e.subtreeFlags & wu) !== He && t !== null ? (t.return = e, Re = t) : $b();
      }
    }
    function $b() {
      for (; Re !== null; ) {
        var e = Re;
        zt(e);
        try {
          Yb(e);
        } catch (a) {
          qt(e, e.return, a);
        }
        bn();
        var t = e.sibling;
        if (t !== null) {
          t.return = e.return, Re = t;
          return;
        }
        Re = e.return;
      }
    }
    function Yb(e) {
      var t = e.alternate, a = e.flags;
      if ((a & ya) !== He) {
        switch (zt(e), e.tag) {
          case se:
          case Ie:
          case Xe:
            break;
          case ce: {
            if (t !== null) {
              var i = t.memoizedProps, u = t.memoizedState, s = e.stateNode;
              e.type === e.elementType && !bs && (s.props !== e.memoizedProps && S("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", et(e) || "instance"), s.state !== e.memoizedState && S("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", et(e) || "instance"));
              var f = s.getSnapshotBeforeUpdate(e.elementType === e.type ? i : Ni(e.type, i), u);
              {
                var p = h1;
                f === void 0 && !p.has(e.type) && (p.add(e.type), S("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", et(e)));
              }
              s.__reactInternalSnapshotBeforeUpdate = f;
            }
            break;
          }
          case $: {
            {
              var v = e.stateNode;
              xx(v.containerInfo);
            }
            break;
          }
          case re:
          case xe:
          case ue:
          case Jt:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
        bn();
      }
    }
    function zi(e, t, a) {
      var i = t.updateQueue, u = i !== null ? i.lastEffect : null;
      if (u !== null) {
        var s = u.next, f = s;
        do {
          if ((f.tag & e) === e) {
            var p = f.destroy;
            f.destroy = void 0, p !== void 0 && ((e & Cr) !== La ? Yv(t) : (e & er) !== La && Ya(t), (e & ol) !== La && jp(!0), zm(t, a, p), (e & ol) !== La && jp(!1), (e & Cr) !== La ? cc() : (e & er) !== La && ku());
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
            (e & Cr) !== La ? Zi(t) : (e & er) !== La && Iv(t);
            var f = s.create;
            (e & ol) !== La && jp(!0), s.destroy = f(), (e & ol) !== La && jp(!1), (e & Cr) !== La ? sc() : (e & er) !== La && Qo();
            {
              var p = s.destroy;
              if (p !== void 0 && typeof p != "function") {
                var v = void 0;
                (s.tag & er) !== He ? v = "useLayoutEffect" : (s.tag & ol) !== He ? v = "useInsertionEffect" : v = "useEffect";
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
    function Ib(e, t) {
      if ((t.flags & nt) !== He)
        switch (t.tag) {
          case ot: {
            var a = t.stateNode.passiveEffectDuration, i = t.memoizedProps, u = i.id, s = i.onPostCommit, f = UC(), p = t.alternate === null ? "mount" : "update";
            NC() && (p = "nested-update"), typeof s == "function" && s(u, p, a, f);
            var v = t.return;
            e: for (; v !== null; ) {
              switch (v.tag) {
                case $:
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
    function Qb(e, t, a, i) {
      if ((a.flags & cr) !== He)
        switch (a.tag) {
          case se:
          case Ie:
          case Xe: {
            if (!Rr)
              if (a.mode & We)
                try {
                  dl(), po(er | Jn, a);
                } finally {
                  fl(a);
                }
              else
                po(er | Jn, a);
            break;
          }
          case ce: {
            var u = a.stateNode;
            if (a.flags & nt && !Rr)
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
            p !== null && (a.type === a.elementType && !bs && (u.props !== a.memoizedProps && S("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", et(a) || "instance"), u.state !== a.memoizedState && S("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", et(a) || "instance")), aC(a, p, u));
            break;
          }
          case $: {
            var v = a.updateQueue;
            if (v !== null) {
              var g = null;
              if (a.child !== null)
                switch (a.child.tag) {
                  case re:
                    g = a.child.stateNode;
                    break;
                  case ce:
                    g = a.child.stateNode;
                    break;
                }
              aC(a, v, g);
            }
            break;
          }
          case re: {
            var E = a.stateNode;
            if (t === null && a.flags & nt) {
              var _ = a.type, b = a.memoizedProps;
              cx(E, _, b);
            }
            break;
          }
          case xe:
            break;
          case ue:
            break;
          case ot: {
            {
              var U = a.memoizedProps, H = U.onCommit, j = U.onRender, de = a.stateNode.effectDuration, je = UC(), Le = t === null ? "mount" : "update";
              NC() && (Le = "nested-update"), typeof j == "function" && j(a.memoizedProps.id, Le, a.actualDuration, a.treeBaseDuration, a.actualStartTime, je);
              {
                typeof H == "function" && H(a.memoizedProps.id, Le, de, je), $D(a);
                var yt = a.return;
                e: for (; yt !== null; ) {
                  switch (yt.tag) {
                    case $:
                      var ft = yt.stateNode;
                      ft.effectDuration += de;
                      break e;
                    case ot:
                      var O = yt.stateNode;
                      O.effectDuration += de;
                      break e;
                  }
                  yt = yt.return;
                }
              }
            }
            break;
          }
          case Ne: {
            eD(e, a);
            break;
          }
          case Et:
          case Jt:
          case Ve:
          case oe:
          case Fe:
          case st:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
      Rr || a.flags & Mr && S1(a);
    }
    function Wb(e) {
      switch (e.tag) {
        case se:
        case Ie:
        case Xe: {
          if (e.mode & We)
            try {
              dl(), m1(e, e.return);
            } finally {
              fl(e);
            }
          else
            m1(e, e.return);
          break;
        }
        case ce: {
          var t = e.stateNode;
          typeof t.componentDidMount == "function" && jb(e, e.return, t), y1(e, e.return);
          break;
        }
        case re: {
          y1(e, e.return);
          break;
        }
      }
    }
    function Gb(e, t) {
      for (var a = null, i = e; ; ) {
        if (i.tag === re) {
          if (a === null) {
            a = i;
            try {
              var u = i.stateNode;
              t ? Ex(u) : Tx(i.stateNode, i.memoizedProps);
            } catch (f) {
              qt(e, e.return, f);
            }
          }
        } else if (i.tag === xe) {
          if (a === null)
            try {
              var s = i.stateNode;
              t ? Cx(s) : Rx(s, i.memoizedProps);
            } catch (f) {
              qt(e, e.return, f);
            }
        } else if (!((i.tag === oe || i.tag === Fe) && i.memoizedState !== null && i !== e)) {
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
    function S1(e) {
      var t = e.ref;
      if (t !== null) {
        var a = e.stateNode, i;
        switch (e.tag) {
          case re:
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
    function qb(e) {
      var t = e.alternate;
      t !== null && (t.return = null), e.return = null;
    }
    function E1(e) {
      var t = e.alternate;
      t !== null && (e.alternate = null, E1(t));
      {
        if (e.child = null, e.deletions = null, e.sibling = null, e.tag === re) {
          var a = e.stateNode;
          a !== null && tw(a);
        }
        e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
      }
    }
    function Xb(e) {
      for (var t = e.return; t !== null; ) {
        if (C1(t))
          return t;
        t = t.return;
      }
      throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
    }
    function C1(e) {
      return e.tag === re || e.tag === $ || e.tag === ue;
    }
    function T1(e) {
      var t = e;
      e: for (; ; ) {
        for (; t.sibling === null; ) {
          if (t.return === null || C1(t.return))
            return null;
          t = t.return;
        }
        for (t.sibling.return = t.return, t = t.sibling; t.tag !== re && t.tag !== xe && t.tag !== pt; ) {
          if (t.flags & Qt || t.child === null || t.tag === ue)
            continue e;
          t.child.return = t, t = t.child;
        }
        if (!(t.flags & Qt))
          return t.stateNode;
      }
    }
    function Kb(e) {
      var t = Xb(e);
      switch (t.tag) {
        case re: {
          var a = t.stateNode;
          t.flags & Ot && (xE(a), t.flags &= ~Ot);
          var i = T1(e);
          t0(e, i, a);
          break;
        }
        case $:
        case ue: {
          var u = t.stateNode.containerInfo, s = T1(e);
          e0(e, s, u);
          break;
        }
        default:
          throw new Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
    function e0(e, t, a) {
      var i = e.tag, u = i === re || i === xe;
      if (u) {
        var s = e.stateNode;
        t ? mx(a, s, t) : vx(a, s);
      } else if (i !== ue) {
        var f = e.child;
        if (f !== null) {
          e0(f, t, a);
          for (var p = f.sibling; p !== null; )
            e0(p, t, a), p = p.sibling;
        }
      }
    }
    function t0(e, t, a) {
      var i = e.tag, u = i === re || i === xe;
      if (u) {
        var s = e.stateNode;
        t ? hx(a, s, t) : px(a, s);
      } else if (i !== ue) {
        var f = e.child;
        if (f !== null) {
          t0(f, t, a);
          for (var p = f.sibling; p !== null; )
            t0(p, t, a), p = p.sibling;
        }
      }
    }
    var xr = null, Ai = !1;
    function Zb(e, t, a) {
      {
        var i = t;
        e: for (; i !== null; ) {
          switch (i.tag) {
            case re: {
              xr = i.stateNode, Ai = !1;
              break e;
            }
            case $: {
              xr = i.stateNode.containerInfo, Ai = !0;
              break e;
            }
            case ue: {
              xr = i.stateNode.containerInfo, Ai = !0;
              break e;
            }
          }
          i = i.return;
        }
        if (xr === null)
          throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
        R1(e, t, a), xr = null, Ai = !1;
      }
      qb(a);
    }
    function vo(e, t, a) {
      for (var i = a.child; i !== null; )
        R1(e, t, i), i = i.sibling;
    }
    function R1(e, t, a) {
      switch (Ul(a), a.tag) {
        case re:
          Rr || wf(a, t);
        case xe: {
          {
            var i = xr, u = Ai;
            xr = null, vo(e, t, a), xr = i, Ai = u, xr !== null && (Ai ? gx(xr, a.stateNode) : yx(xr, a.stateNode));
          }
          return;
        }
        case pt: {
          xr !== null && (Ai ? Sx(xr, a.stateNode) : dg(xr, a.stateNode));
          return;
        }
        case ue: {
          {
            var s = xr, f = Ai;
            xr = a.stateNode.containerInfo, Ai = !0, vo(e, t, a), xr = s, Ai = f;
          }
          return;
        }
        case se:
        case Ie:
        case Ct:
        case Xe: {
          if (!Rr) {
            var p = a.updateQueue;
            if (p !== null) {
              var v = p.lastEffect;
              if (v !== null) {
                var g = v.next, E = g;
                do {
                  var _ = E, b = _.destroy, U = _.tag;
                  b !== void 0 && ((U & ol) !== La ? zm(a, t, b) : (U & er) !== La && (Ya(a), a.mode & We ? (dl(), zm(a, t, b), fl(a)) : zm(a, t, b), ku())), E = E.next;
                } while (E !== g);
              }
            }
          }
          vo(e, t, a);
          return;
        }
        case ce: {
          if (!Rr) {
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
        case oe: {
          if (
            // TODO: Remove this dead flag
            a.mode & Oe
          ) {
            var j = Rr;
            Rr = j || a.memoizedState !== null, vo(e, t, a), Rr = j;
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
    function Jb(e) {
      e.memoizedState;
    }
    function eD(e, t) {
      var a = t.memoizedState;
      if (a === null) {
        var i = t.alternate;
        if (i !== null) {
          var u = i.memoizedState;
          if (u !== null) {
            var s = u.dehydrated;
            s !== null && Hx(s);
          }
        }
      }
    }
    function x1(e) {
      var t = e.updateQueue;
      if (t !== null) {
        e.updateQueue = null;
        var a = e.stateNode;
        a === null && (a = e.stateNode = new Fb()), t.forEach(function(i) {
          var u = XD.bind(null, e, i);
          if (!a.has(i)) {
            if (a.add(i), ea)
              if (Rf !== null && xf !== null)
                Vp(xf, Rf);
              else
                throw Error("Expected finished root and lanes to be set. This is a bug in React.");
            i.then(u, u);
          }
        });
      }
    }
    function tD(e, t, a) {
      Rf = a, xf = e, zt(t), w1(t, e), zt(t), Rf = null, xf = null;
    }
    function Fi(e, t, a) {
      var i = t.deletions;
      if (i !== null)
        for (var u = 0; u < i.length; u++) {
          var s = i[u];
          try {
            Zb(e, t, s);
          } catch (v) {
            qt(s, t, v);
          }
        }
      var f = py();
      if (t.subtreeFlags & zr)
        for (var p = t.child; p !== null; )
          zt(p), w1(p, e), p = p.sibling;
      zt(f);
    }
    function w1(e, t, a) {
      var i = e.alternate, u = e.flags;
      switch (e.tag) {
        case se:
        case Ie:
        case Ct:
        case Xe: {
          if (Fi(t, e), pl(e), u & nt) {
            try {
              zi(ol | Jn, e, e.return), po(ol | Jn, e);
            } catch (Ye) {
              qt(e, e.return, Ye);
            }
            if (e.mode & We) {
              try {
                dl(), zi(er | Jn, e, e.return);
              } catch (Ye) {
                qt(e, e.return, Ye);
              }
              fl(e);
            } else
              try {
                zi(er | Jn, e, e.return);
              } catch (Ye) {
                qt(e, e.return, Ye);
              }
          }
          return;
        }
        case ce: {
          Fi(t, e), pl(e), u & Mr && i !== null && wf(i, i.return);
          return;
        }
        case re: {
          Fi(t, e), pl(e), u & Mr && i !== null && wf(i, i.return);
          {
            if (e.flags & Ot) {
              var s = e.stateNode;
              try {
                xE(s);
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
                    fx(f, E, g, v, p, e);
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
            var _ = e.stateNode, b = e.memoizedProps, U = i !== null ? i.memoizedProps : b;
            try {
              dx(_, U, b);
            } catch (Ye) {
              qt(e, e.return, Ye);
            }
          }
          return;
        }
        case $: {
          if (Fi(t, e), pl(e), u & nt && i !== null) {
            var H = i.memoizedState;
            if (H.isDehydrated)
              try {
                Fx(t.containerInfo);
              } catch (Ye) {
                qt(e, e.return, Ye);
              }
          }
          return;
        }
        case ue: {
          Fi(t, e), pl(e);
          return;
        }
        case Ne: {
          Fi(t, e), pl(e);
          var j = e.child;
          if (j.flags & qi) {
            var de = j.stateNode, je = j.memoizedState, Le = je !== null;
            if (de.isHidden = Le, Le) {
              var yt = j.alternate !== null && j.alternate.memoizedState !== null;
              yt || zD();
            }
          }
          if (u & nt) {
            try {
              Jb(e);
            } catch (Ye) {
              qt(e, e.return, Ye);
            }
            x1(e);
          }
          return;
        }
        case oe: {
          var ft = i !== null && i.memoizedState !== null;
          if (
            // TODO: Remove this dead flag
            e.mode & Oe
          ) {
            var O = Rr;
            Rr = O || ft, Fi(t, e), Rr = O;
          } else
            Fi(t, e);
          if (pl(e), u & qi) {
            var B = e.stateNode, L = e.memoizedState, K = L !== null, ye = e;
            if (B.isHidden = K, K && !ft && (ye.mode & Oe) !== De) {
              Re = ye;
              for (var ve = ye.child; ve !== null; )
                Re = ve, rD(ve), ve = ve.sibling;
            }
            Gb(ye, K);
          }
          return;
        }
        case Et: {
          Fi(t, e), pl(e), u & nt && x1(e);
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
          Kb(e);
        } catch (a) {
          qt(e, e.return, a);
        }
        e.flags &= ~Qt;
      }
      t & ga && (e.flags &= ~ga);
    }
    function nD(e, t, a) {
      Rf = a, xf = t, Re = e, b1(e, t, a), Rf = null, xf = null;
    }
    function b1(e, t, a) {
      for (var i = (e.mode & Oe) !== De; Re !== null; ) {
        var u = Re, s = u.child;
        if (u.tag === oe && i) {
          var f = u.memoizedState !== null, p = f || Um;
          if (p) {
            n0(e, t, a);
            continue;
          } else {
            var v = u.alternate, g = v !== null && v.memoizedState !== null, E = g || Rr, _ = Um, b = Rr;
            Um = p, Rr = E, Rr && !b && (Re = u, aD(u));
            for (var U = s; U !== null; )
              Re = U, b1(
                U,
                // New root; bubble back up to here and stop.
                t,
                a
              ), U = U.sibling;
            Re = u, Um = _, Rr = b, n0(e, t, a);
            continue;
          }
        }
        (u.subtreeFlags & cr) !== He && s !== null ? (s.return = u, Re = s) : n0(e, t, a);
      }
    }
    function n0(e, t, a) {
      for (; Re !== null; ) {
        var i = Re;
        if ((i.flags & cr) !== He) {
          var u = i.alternate;
          zt(i);
          try {
            Qb(t, u, i, a);
          } catch (f) {
            qt(i, i.return, f);
          }
          bn();
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
    function rD(e) {
      for (; Re !== null; ) {
        var t = Re, a = t.child;
        switch (t.tag) {
          case se:
          case Ie:
          case Ct:
          case Xe: {
            if (t.mode & We)
              try {
                dl(), zi(er, t, t.return);
              } finally {
                fl(t);
              }
            else
              zi(er, t, t.return);
            break;
          }
          case ce: {
            wf(t, t.return);
            var i = t.stateNode;
            typeof i.componentWillUnmount == "function" && JS(t, t.return, i);
            break;
          }
          case re: {
            wf(t, t.return);
            break;
          }
          case oe: {
            var u = t.memoizedState !== null;
            if (u) {
              D1(e);
              continue;
            }
            break;
          }
        }
        a !== null ? (a.return = t, Re = a) : D1(e);
      }
    }
    function D1(e) {
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
    function aD(e) {
      for (; Re !== null; ) {
        var t = Re, a = t.child;
        if (t.tag === oe) {
          var i = t.memoizedState !== null;
          if (i) {
            _1(e);
            continue;
          }
        }
        a !== null ? (a.return = t, Re = a) : _1(e);
      }
    }
    function _1(e) {
      for (; Re !== null; ) {
        var t = Re;
        zt(t);
        try {
          Wb(t);
        } catch (i) {
          qt(t, t.return, i);
        }
        if (bn(), t === e) {
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
    function iD(e, t, a, i) {
      Re = t, lD(t, e, a, i);
    }
    function lD(e, t, a, i) {
      for (; Re !== null; ) {
        var u = Re, s = u.child;
        (u.subtreeFlags & Sa) !== He && s !== null ? (s.return = u, Re = s) : uD(e, t, a, i);
      }
    }
    function uD(e, t, a, i) {
      for (; Re !== null; ) {
        var u = Re;
        if ((u.flags & Xt) !== He) {
          zt(u);
          try {
            oD(t, u, a, i);
          } catch (f) {
            qt(u, u.return, f);
          }
          bn();
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
    function oD(e, t, a, i) {
      switch (t.tag) {
        case se:
        case Ie:
        case Xe: {
          if (t.mode & We) {
            CS();
            try {
              po(Cr | Jn, t);
            } finally {
              ES(t);
            }
          } else
            po(Cr | Jn, t);
          break;
        }
      }
    }
    function sD(e) {
      Re = e, cD();
    }
    function cD() {
      for (; Re !== null; ) {
        var e = Re, t = e.child;
        if ((Re.flags & Dt) !== He) {
          var a = e.deletions;
          if (a !== null) {
            for (var i = 0; i < a.length; i++) {
              var u = a[i];
              Re = u, pD(u, e);
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
        (e.subtreeFlags & Sa) !== He && t !== null ? (t.return = e, Re = t) : fD();
      }
    }
    function fD() {
      for (; Re !== null; ) {
        var e = Re;
        (e.flags & Xt) !== He && (zt(e), dD(e), bn());
        var t = e.sibling;
        if (t !== null) {
          t.return = e.return, Re = t;
          return;
        }
        Re = e.return;
      }
    }
    function dD(e) {
      switch (e.tag) {
        case se:
        case Ie:
        case Xe: {
          e.mode & We ? (CS(), zi(Cr | Jn, e, e.return), ES(e)) : zi(Cr | Jn, e, e.return);
          break;
        }
      }
    }
    function pD(e, t) {
      for (; Re !== null; ) {
        var a = Re;
        zt(a), hD(a, t), bn();
        var i = a.child;
        i !== null ? (i.return = a, Re = i) : vD(e);
      }
    }
    function vD(e) {
      for (; Re !== null; ) {
        var t = Re, a = t.sibling, i = t.return;
        if (E1(t), t === e) {
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
    function hD(e, t) {
      switch (e.tag) {
        case se:
        case Ie:
        case Xe: {
          e.mode & We ? (CS(), zi(Cr, e, t), ES(e)) : zi(Cr, e, t);
          break;
        }
      }
    }
    function mD(e) {
      switch (e.tag) {
        case se:
        case Ie:
        case Xe: {
          try {
            po(er | Jn, e);
          } catch (a) {
            qt(e, e.return, a);
          }
          break;
        }
        case ce: {
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
    function yD(e) {
      switch (e.tag) {
        case se:
        case Ie:
        case Xe: {
          try {
            po(Cr | Jn, e);
          } catch (t) {
            qt(e, e.return, t);
          }
          break;
        }
      }
    }
    function gD(e) {
      switch (e.tag) {
        case se:
        case Ie:
        case Xe: {
          try {
            zi(er | Jn, e, e.return);
          } catch (a) {
            qt(e, e.return, a);
          }
          break;
        }
        case ce: {
          var t = e.stateNode;
          typeof t.componentWillUnmount == "function" && JS(e, e.return, t);
          break;
        }
      }
    }
    function SD(e) {
      switch (e.tag) {
        case se:
        case Ie:
        case Xe:
          try {
            zi(Cr | Jn, e, e.return);
          } catch (t) {
            qt(e, e.return, t);
          }
      }
    }
    if (typeof Symbol == "function" && Symbol.for) {
      var _p = Symbol.for;
      _p("selector.component"), _p("selector.has_pseudo_class"), _p("selector.role"), _p("selector.test_id"), _p("selector.text");
    }
    var ED = [];
    function CD() {
      ED.forEach(function(e) {
        return e();
      });
    }
    var TD = y.ReactCurrentActQueue;
    function RD(e) {
      {
        var t = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        ), a = typeof jest < "u";
        return a && t !== !1;
      }
    }
    function k1() {
      {
        var e = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        );
        return !e && TD.current !== null && S("The current testing environment is not configured to support act(...)"), e;
      }
    }
    var xD = Math.ceil, r0 = y.ReactCurrentDispatcher, a0 = y.ReactCurrentOwner, wr = y.ReactCurrentBatchConfig, Hi = y.ReactCurrentActQueue, rr = (
      /*             */
      0
    ), O1 = (
      /*               */
      1
    ), br = (
      /*                */
      2
    ), si = (
      /*                */
      4
    ), nu = 0, kp = 1, Ds = 2, Am = 3, Op = 4, L1 = 5, i0 = 6, mt = rr, aa = null, yn = null, ar = I, vl = I, l0 = ro(I), ir = nu, Lp = null, Fm = I, Mp = I, Hm = I, Np = null, Ma = null, u0 = 0, M1 = 500, N1 = 1 / 0, wD = 500, ru = null;
    function Up() {
      N1 = nn() + wD;
    }
    function U1() {
      return N1;
    }
    var Vm = !1, o0 = null, bf = null, _s = !1, ho = null, zp = I, s0 = [], c0 = null, bD = 50, Ap = 0, f0 = null, d0 = !1, jm = !1, DD = 50, Df = 0, Bm = null, Fp = $t, Pm = I, z1 = !1;
    function $m() {
      return aa;
    }
    function ia() {
      return (mt & (br | si)) !== rr ? nn() : (Fp !== $t || (Fp = nn()), Fp);
    }
    function mo(e) {
      var t = e.mode;
      if ((t & Oe) === De)
        return Ae;
      if ((mt & br) !== rr && ar !== I)
        return Hu(ar);
      var a = Tw() !== Cw;
      if (a) {
        if (wr.transition !== null) {
          var i = wr.transition;
          i._updatedFibers || (i._updatedFibers = /* @__PURE__ */ new Set()), i._updatedFibers.add(e);
        }
        return Pm === Tn && (Pm = th()), Pm;
      }
      var u = xa();
      if (u !== Tn)
        return u;
      var s = lx();
      return s;
    }
    function _D(e) {
      var t = e.mode;
      return (t & Oe) === De ? Ae : Vr();
    }
    function lr(e, t, a, i) {
      ZD(), z1 && S("useInsertionEffect must not schedule updates."), d0 && (jm = !0), Pl(e, a, i), (mt & br) !== I && e === aa ? t_(t) : (ea && Nc(e, t, a), n_(t), e === aa && ((mt & br) === rr && (Mp = tt(Mp, a)), ir === Op && yo(e, ar)), Na(e, i), a === Ae && mt === rr && (t.mode & Oe) === De && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
      !Hi.isBatchingLegacy && (Up(), zE()));
    }
    function kD(e, t, a) {
      var i = e.current;
      i.lanes = t, Pl(e, t, a), Na(e, a);
    }
    function OD(e) {
      return (
        // TODO: Remove outdated deferRenderPhaseUpdateToNextBatch experiment. We
        // decided not to enable it.
        (mt & br) !== rr
      );
    }
    function Na(e, t) {
      var a = e.callbackNode;
      Xv(e, t);
      var i = jl(e, e === aa ? ar : I);
      if (i === I) {
        a !== null && K1(a), e.callbackNode = null, e.callbackPriority = Tn;
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
      a != null && K1(a);
      var f;
      if (u === Ae)
        e.tag === ao ? (Hi.isBatchingLegacy !== null && (Hi.didScheduleLegacyUpdate = !0), aw(H1.bind(null, e))) : UE(H1.bind(null, e)), Hi.current !== null ? Hi.current.push(io) : ox(function() {
          (mt & (br | si)) === rr && io();
        }), f = null;
      else {
        var p;
        switch (Zn(i)) {
          case hn:
            p = lc;
            break;
          case xi:
            p = Nl;
            break;
          case ei:
            p = Ja;
            break;
          case Vu:
            p = uc;
            break;
          default:
            p = Ja;
            break;
        }
        f = E0(p, A1.bind(null, e));
      }
      e.callbackPriority = u, e.callbackNode = f;
    }
    function A1(e, t) {
      if (Gw(), Fp = $t, Pm = I, (mt & (br | si)) !== rr)
        throw new Error("Should not already be working.");
      var a = e.callbackNode, i = iu();
      if (i && e.callbackNode !== a)
        return null;
      var u = jl(e, e === aa ? ar : I);
      if (u === I)
        return null;
      var s = !es(e, u) && !eh(e, u) && !t, f = s ? jD(e, u) : Im(e, u);
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
          if (g && !MD(E)) {
            if (f = Im(e, u), f === Ds) {
              var _ = el(e);
              _ !== I && (u = _, f = p0(e, _));
            }
            if (f === kp) {
              var b = Lp;
              throw ks(e, I), yo(e, u), Na(e, nn()), b;
            }
          }
          e.finishedWork = E, e.finishedLanes = u, LD(e, f, u);
        }
      }
      return Na(e, nn()), e.callbackNode === a ? A1.bind(null, e) : null;
    }
    function p0(e, t) {
      var a = Np;
      if (Uc(e)) {
        var i = ks(e, t);
        i.flags |= un, Kx(e.containerInfo);
      }
      var u = Im(e, t);
      if (u !== Ds) {
        var s = Ma;
        Ma = a, s !== null && F1(s);
      }
      return u;
    }
    function F1(e) {
      Ma === null ? Ma = e : Ma.push.apply(Ma, e);
    }
    function LD(e, t, a) {
      switch (t) {
        case nu:
        case kp:
          throw new Error("Root did not complete. This is a bug in React.");
        case Ds: {
          Os(e, Ma, ru);
          break;
        }
        case Am: {
          if (yo(e, a), Kv(a) && // do not delay if we're inside an act() scope
          !Z1()) {
            var i = u0 + M1 - nn();
            if (i > 10) {
              var u = jl(e, I);
              if (u !== I)
                break;
              var s = e.suspendedLanes;
              if (!Bl(s, a)) {
                ia(), Lc(e, s);
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
          if (yo(e, a), Jv(a))
            break;
          if (!Z1()) {
            var f = Gv(e, a), p = f, v = nn() - p, g = KD(v) - v;
            if (g > 10) {
              e.timeoutHandle = cg(Os.bind(null, e, Ma, ru), g);
              break;
            }
          }
          Os(e, Ma, ru);
          break;
        }
        case L1: {
          Os(e, Ma, ru);
          break;
        }
        default:
          throw new Error("Unknown root exit status.");
      }
    }
    function MD(e) {
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
      t = ts(t, Hm), t = ts(t, Mp), rh(e, t);
    }
    function H1(e) {
      if (qw(), (mt & (br | si)) !== rr)
        throw new Error("Should not already be working.");
      iu();
      var t = jl(e, I);
      if (!jr(t, Ae))
        return Na(e, nn()), null;
      var a = Im(e, t);
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
    function ND(e, t) {
      t !== I && (Dd(e, tt(t, Ae)), Na(e, nn()), (mt & (br | si)) === rr && (Up(), io()));
    }
    function v0(e, t) {
      var a = mt;
      mt |= O1;
      try {
        return e(t);
      } finally {
        mt = a, mt === rr && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
        !Hi.isBatchingLegacy && (Up(), zE());
      }
    }
    function UD(e, t, a, i, u) {
      var s = xa(), f = wr.transition;
      try {
        return wr.transition = null, on(hn), e(t, a, i, u);
      } finally {
        on(s), wr.transition = f, mt === rr && Up();
      }
    }
    function au(e) {
      ho !== null && ho.tag === ao && (mt & (br | si)) === rr && iu();
      var t = mt;
      mt |= O1;
      var a = wr.transition, i = xa();
      try {
        return wr.transition = null, on(hn), e ? e() : void 0;
      } finally {
        on(i), wr.transition = a, mt = t, (mt & (br | si)) === rr && io();
      }
    }
    function V1() {
      return (mt & (br | si)) !== rr;
    }
    function Ym(e, t) {
      $r(l0, vl, e), vl = tt(vl, t);
    }
    function h0(e) {
      vl = l0.current, Pr(l0, e);
    }
    function ks(e, t) {
      e.finishedWork = null, e.finishedLanes = I;
      var a = e.timeoutHandle;
      if (a !== fg && (e.timeoutHandle = fg, ux(a)), yn !== null)
        for (var i = yn.return; i !== null; ) {
          var u = i.alternate;
          v1(u, i), i = i.return;
        }
      aa = e;
      var s = Ls(e.current, null);
      return yn = s, ar = vl = t, ir = nu, Lp = null, Fm = I, Mp = I, Hm = I, Np = null, Ma = null, kw(), Oi.discardPendingWarnings(), s;
    }
    function j1(e, t) {
      do {
        var a = yn;
        try {
          if (em(), cC(), bn(), a0.current = null, a === null || a.return === null) {
            ir = kp, Lp = t, yn = null;
            return;
          }
          if (en && a.mode & We && km(a, !0), ca)
            if (Fr(), t !== null && typeof t == "object" && typeof t.then == "function") {
              var i = t;
              zl(a, i, ar);
            } else
              Wo(a, t, ar);
          ab(e, a.return, a, t, ar), Y1(a);
        } catch (u) {
          t = u, yn === a && a !== null ? (a = a.return, yn = a) : a = yn;
          continue;
        }
        return;
      } while (!0);
    }
    function B1() {
      var e = r0.current;
      return r0.current = xm, e === null ? xm : e;
    }
    function P1(e) {
      r0.current = e;
    }
    function zD() {
      u0 = nn();
    }
    function Hp(e) {
      Fm = tt(e, Fm);
    }
    function AD() {
      ir === nu && (ir = Am);
    }
    function m0() {
      (ir === nu || ir === Am || ir === Ds) && (ir = Op), aa !== null && (Jo(Fm) || Jo(Mp)) && yo(aa, ar);
    }
    function FD(e) {
      ir !== Op && (ir = Ds), Np === null ? Np = [e] : Np.push(e);
    }
    function HD() {
      return ir === nu;
    }
    function Im(e, t) {
      var a = mt;
      mt |= br;
      var i = B1();
      if (aa !== e || ar !== t) {
        if (ea) {
          var u = e.memoizedUpdaters;
          u.size > 0 && (Vp(e, ar), u.clear()), _d(e, t);
        }
        ru = rs(), ks(e, t);
      }
      Kt(t);
      do
        try {
          VD();
          break;
        } catch (s) {
          j1(e, s);
        }
      while (!0);
      if (em(), mt = a, P1(i), yn !== null)
        throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");
      return dc(), aa = null, ar = I, ir;
    }
    function VD() {
      for (; yn !== null; )
        $1(yn);
    }
    function jD(e, t) {
      var a = mt;
      mt |= br;
      var i = B1();
      if (aa !== e || ar !== t) {
        if (ea) {
          var u = e.memoizedUpdaters;
          u.size > 0 && (Vp(e, ar), u.clear()), _d(e, t);
        }
        ru = rs(), Up(), ks(e, t);
      }
      Kt(t);
      do
        try {
          BD();
          break;
        } catch (s) {
          j1(e, s);
        }
      while (!0);
      return em(), P1(i), mt = a, yn !== null ? (fc(), nu) : (dc(), aa = null, ar = I, ir);
    }
    function BD() {
      for (; yn !== null && !ic(); )
        $1(yn);
    }
    function $1(e) {
      var t = e.alternate;
      zt(e);
      var a;
      (e.mode & We) !== De ? (SS(e), a = y0(t, e, vl), km(e, !0)) : a = y0(t, e, vl), bn(), e.memoizedProps = e.pendingProps, a === null ? Y1(e) : yn = a, a0.current = null;
    }
    function Y1(e) {
      var t = e;
      do {
        var a = t.alternate, i = t.return;
        if ((t.flags & Kr) === He) {
          zt(t);
          var u = void 0;
          if ((t.mode & We) === De ? u = p1(a, t, vl) : (SS(t), u = p1(a, t, vl), km(t, !1)), bn(), u !== null) {
            yn = u;
            return;
          }
        } else {
          var s = Ab(a, t);
          if (s !== null) {
            s.flags &= Fv, yn = s;
            return;
          }
          if ((t.mode & We) !== De) {
            km(t, !1);
            for (var f = t.actualDuration, p = t.child; p !== null; )
              f += p.actualDuration, p = p.sibling;
            t.actualDuration = f;
          }
          if (i !== null)
            i.flags |= Kr, i.subtreeFlags = He, i.deletions = null;
          else {
            ir = i0, yn = null;
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
      ir === nu && (ir = L1);
    }
    function Os(e, t, a) {
      var i = xa(), u = wr.transition;
      try {
        wr.transition = null, on(hn), PD(e, t, a, i);
      } finally {
        wr.transition = u, on(i);
      }
      return null;
    }
    function PD(e, t, a, i) {
      do
        iu();
      while (ho !== null);
      if (JD(), (mt & (br | si)) !== rr)
        throw new Error("Should not already be working.");
      var u = e.finishedWork, s = e.finishedLanes;
      if (Ki(s), u === null)
        return oc(), null;
      if (s === I && S("root.finishedLanes should not be empty during a commit. This is a bug in React."), e.finishedWork = null, e.finishedLanes = I, u === e.current)
        throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
      e.callbackNode = null, e.callbackPriority = Tn;
      var f = tt(u.lanes, u.childLanes);
      Mc(e, f), e === aa && (aa = null, yn = null, ar = I), ((u.subtreeFlags & Sa) !== He || (u.flags & Sa) !== He) && (_s || (_s = !0, c0 = a, E0(Ja, function() {
        return iu(), null;
      })));
      var p = (u.subtreeFlags & (wu | zr | cr | Sa)) !== He, v = (u.flags & (wu | zr | cr | Sa)) !== He;
      if (p || v) {
        var g = wr.transition;
        wr.transition = null;
        var E = xa();
        on(hn);
        var _ = mt;
        mt |= si, a0.current = null, Bb(e, u), zC(), tD(e, u, s), ex(e.containerInfo), e.current = u, Sd(s), nD(u, e, s), Ou(), jv(), mt = _, on(E), wr.transition = g;
      } else
        e.current = u, zC();
      var b = _s;
      if (_s ? (_s = !1, ho = e, zp = s) : (Df = 0, Bm = null), f = e.pendingLanes, f === I && (bf = null), b || G1(e.current, !1), Du(u.stateNode, i), ea && e.memoizedUpdaters.clear(), CD(), Na(e, nn()), t !== null)
        for (var U = e.onRecoverableError, H = 0; H < t.length; H++) {
          var j = t[H], de = j.stack, je = j.digest;
          U(j.value, {
            componentStack: de,
            digest: je
          });
        }
      if (Vm) {
        Vm = !1;
        var Le = o0;
        throw o0 = null, Le;
      }
      return jr(zp, Ae) && e.tag !== ao && iu(), f = e.pendingLanes, jr(f, Ae) ? (Ww(), e === f0 ? Ap++ : (Ap = 0, f0 = e)) : Ap = 0, io(), oc(), null;
    }
    function iu() {
      if (ho !== null) {
        var e = Zn(zp), t = zy(ei, e), a = wr.transition, i = xa();
        try {
          return wr.transition = null, on(t), YD();
        } finally {
          on(i), wr.transition = a;
        }
      }
      return !1;
    }
    function $D(e) {
      s0.push(e), _s || (_s = !0, E0(Ja, function() {
        return iu(), null;
      }));
    }
    function YD() {
      if (ho === null)
        return !1;
      var e = c0;
      c0 = null;
      var t = ho, a = zp;
      if (ho = null, zp = I, (mt & (br | si)) !== rr)
        throw new Error("Cannot flush passive effects while already rendering.");
      d0 = !0, jm = !1, Qv(a);
      var i = mt;
      mt |= si, sD(t.current), iD(t, t.current, a, e);
      {
        var u = s0;
        s0 = [];
        for (var s = 0; s < u.length; s++) {
          var f = u[s];
          Ib(t, f);
        }
      }
      Ed(), G1(t.current, !0), mt = i, io(), jm ? t === Bm ? Df++ : (Df = 0, Bm = t) : Df = 0, d0 = !1, jm = !1, Ta(t);
      {
        var p = t.current.stateNode;
        p.effectDuration = 0, p.passiveEffectDuration = 0;
      }
      return !0;
    }
    function I1(e) {
      return bf !== null && bf.has(e);
    }
    function ID(e) {
      bf === null ? bf = /* @__PURE__ */ new Set([e]) : bf.add(e);
    }
    function QD(e) {
      Vm || (Vm = !0, o0 = e);
    }
    var WD = QD;
    function Q1(e, t, a) {
      var i = ws(a, t), u = $C(e, i, Ae), s = uo(e, u, Ae), f = ia();
      s !== null && (Pl(s, Ae, f), Na(s, f));
    }
    function qt(e, t, a) {
      if (Hb(a), jp(!1), e.tag === $) {
        Q1(e, e, a);
        return;
      }
      var i = null;
      for (i = t; i !== null; ) {
        if (i.tag === $) {
          Q1(i, e, a);
          return;
        } else if (i.tag === ce) {
          var u = i.type, s = i.stateNode;
          if (typeof u.getDerivedStateFromError == "function" || typeof s.componentDidCatch == "function" && !I1(s)) {
            var f = ws(a, e), p = FS(i, f, Ae), v = uo(i, p, Ae), g = ia();
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
    function GD(e, t, a) {
      var i = e.pingCache;
      i !== null && i.delete(t);
      var u = ia();
      Lc(e, a), r_(e), aa === e && Bl(ar, a) && (ir === Op || ir === Am && Kv(ar) && nn() - u0 < M1 ? ks(e, I) : Hm = tt(Hm, a)), Na(e, u);
    }
    function W1(e, t) {
      t === Tn && (t = _D(e));
      var a = ia(), i = Oa(e, t);
      i !== null && (Pl(i, t, a), Na(i, a));
    }
    function qD(e) {
      var t = e.memoizedState, a = Tn;
      t !== null && (a = t.retryLane), W1(e, a);
    }
    function XD(e, t) {
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
      i !== null && i.delete(t), W1(e, a);
    }
    function KD(e) {
      return e < 120 ? 120 : e < 480 ? 480 : e < 1080 ? 1080 : e < 1920 ? 1920 : e < 3e3 ? 3e3 : e < 4320 ? 4320 : xD(e / 1960) * 1960;
    }
    function ZD() {
      if (Ap > bD)
        throw Ap = 0, f0 = null, new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
      Df > DD && (Df = 0, Bm = null, S("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."));
    }
    function JD() {
      Oi.flushLegacyContextWarning(), Oi.flushPendingUnsafeLifecycleWarnings();
    }
    function G1(e, t) {
      zt(e), Qm(e, Ur, gD), t && Qm(e, Ml, SD), Qm(e, Ur, mD), t && Qm(e, Ml, yD), bn();
    }
    function Qm(e, t, a) {
      for (var i = e, u = null; i !== null; ) {
        var s = i.subtreeFlags & t;
        i !== u && i.child !== null && s !== He ? i = i.child : ((i.flags & t) !== He && a(i), i.sibling !== null ? i = i.sibling : i = u = i.return);
      }
    }
    var Wm = null;
    function q1(e) {
      {
        if ((mt & br) !== rr || !(e.mode & Oe))
          return;
        var t = e.tag;
        if (t !== Me && t !== $ && t !== ce && t !== se && t !== Ie && t !== Ct && t !== Xe)
          return;
        var a = et(e) || "ReactComponent";
        if (Wm !== null) {
          if (Wm.has(a))
            return;
          Wm.add(a);
        } else
          Wm = /* @__PURE__ */ new Set([a]);
        var i = Sn;
        try {
          zt(e), S("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.");
        } finally {
          i ? zt(e) : bn();
        }
      }
    }
    var y0;
    {
      var e_ = null;
      y0 = function(e, t, a) {
        var i = rT(e_, t);
        try {
          return o1(e, t, a);
        } catch (s) {
          if (dw() || s !== null && typeof s == "object" && typeof s.then == "function")
            throw s;
          if (em(), cC(), v1(e, t), rT(t, i), t.mode & We && SS(t), Ll(null, o1, null, e, t, a), Oy()) {
            var u = cd();
            typeof u == "object" && u !== null && u._suppressLogging && typeof s == "object" && s !== null && !s._suppressLogging && (s._suppressLogging = !0);
          }
          throw s;
        }
      };
    }
    var X1 = !1, g0;
    g0 = /* @__PURE__ */ new Set();
    function t_(e) {
      if (pa && !Yw())
        switch (e.tag) {
          case se:
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
          case ce: {
            X1 || (S("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."), X1 = !0);
            break;
          }
        }
    }
    function Vp(e, t) {
      if (ea) {
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
    function K1(e) {
      if (e !== S0)
        return Vv(e);
    }
    function Z1() {
      return Hi.current !== null;
    }
    function n_(e) {
      {
        if (e.mode & Oe) {
          if (!k1())
            return;
        } else if (!RD() || mt !== rr || e.tag !== se && e.tag !== Ie && e.tag !== Xe)
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
            t ? zt(e) : bn();
          }
        }
      }
    }
    function r_(e) {
      e.tag !== ao && k1() && Hi.current === null && S(`A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`);
    }
    function jp(e) {
      z1 = e;
    }
    var ci = null, _f = null, a_ = function(e) {
      ci = e;
    };
    function kf(e) {
      {
        if (ci === null)
          return e;
        var t = ci(e);
        return t === void 0 ? e : t.current;
      }
    }
    function C0(e) {
      return kf(e);
    }
    function T0(e) {
      {
        if (ci === null)
          return e;
        var t = ci(e);
        if (t === void 0) {
          if (e != null && typeof e.render == "function") {
            var a = kf(e.render);
            if (e.render !== a) {
              var i = {
                $$typeof: ae,
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
    function J1(e, t) {
      {
        if (ci === null)
          return !1;
        var a = e.elementType, i = t.type, u = !1, s = typeof i == "object" && i !== null ? i.$$typeof : null;
        switch (e.tag) {
          case ce: {
            typeof i == "function" && (u = !0);
            break;
          }
          case se: {
            (typeof i == "function" || s === $e) && (u = !0);
            break;
          }
          case Ie: {
            (s === ae || s === $e) && (u = !0);
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
          var f = ci(a);
          if (f !== void 0 && f === ci(i))
            return !0;
        }
        return !1;
      }
    }
    function eT(e) {
      {
        if (ci === null || typeof WeakSet != "function")
          return;
        _f === null && (_f = /* @__PURE__ */ new WeakSet()), _f.add(e);
      }
    }
    var i_ = function(e, t) {
      {
        if (ci === null)
          return;
        var a = t.staleFamilies, i = t.updatedFamilies;
        iu(), au(function() {
          R0(e.current, i, a);
        });
      }
    }, l_ = function(e, t) {
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
          case se:
          case Xe:
          case ce:
            v = p;
            break;
          case Ie:
            v = p.render;
            break;
        }
        if (ci === null)
          throw new Error("Expected resolveFamily to be set during hot reload.");
        var g = !1, E = !1;
        if (v !== null) {
          var _ = ci(v);
          _ !== void 0 && (a.has(_) ? E = !0 : t.has(_) && (f === ce ? E = !0 : g = !0));
        }
        if (_f !== null && (_f.has(e) || i !== null && _f.has(i)) && (E = !0), E && (e._debugNeedsRemount = !0), E || g) {
          var b = Oa(e, Ae);
          b !== null && lr(b, e, Ae, $t);
        }
        u !== null && !E && R0(u, t, a), s !== null && R0(s, t, a);
      }
    }
    var u_ = function(e, t) {
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
          case se:
          case Xe:
          case ce:
            p = f;
            break;
          case Ie:
            p = f.render;
            break;
        }
        var v = !1;
        p !== null && t.has(p) && (v = !0), v ? o_(e, a) : i !== null && x0(i, t, a), u !== null && x0(u, t, a);
      }
    }
    function o_(e, t) {
      {
        var a = s_(e, t);
        if (a)
          return;
        for (var i = e; ; ) {
          switch (i.tag) {
            case re:
              t.add(i.stateNode);
              return;
            case ue:
              t.add(i.stateNode.containerInfo);
              return;
            case $:
              t.add(i.stateNode.containerInfo);
              return;
          }
          if (i.return === null)
            throw new Error("Expected to reach root first.");
          i = i.return;
        }
      }
    }
    function s_(e, t) {
      for (var a = e, i = !1; ; ) {
        if (a.tag === re)
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
        var tT = Object.preventExtensions({});
      } catch {
        w0 = !0;
      }
    }
    function c_(e, t, a, i) {
      this.tag = e, this.key = a, this.elementType = null, this.type = null, this.stateNode = null, this.return = null, this.child = null, this.sibling = null, this.index = 0, this.ref = null, this.pendingProps = t, this.memoizedProps = null, this.updateQueue = null, this.memoizedState = null, this.dependencies = null, this.mode = i, this.flags = He, this.subtreeFlags = He, this.deletions = null, this.lanes = I, this.childLanes = I, this.alternate = null, this.actualDuration = Number.NaN, this.actualStartTime = Number.NaN, this.selfBaseDuration = Number.NaN, this.treeBaseDuration = Number.NaN, this.actualDuration = 0, this.actualStartTime = -1, this.selfBaseDuration = 0, this.treeBaseDuration = 0, this._debugSource = null, this._debugOwner = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, !w0 && typeof Object.preventExtensions == "function" && Object.preventExtensions(this);
    }
    var Qa = function(e, t, a, i) {
      return new c_(e, t, a, i);
    };
    function b0(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function f_(e) {
      return typeof e == "function" && !b0(e) && e.defaultProps === void 0;
    }
    function d_(e) {
      if (typeof e == "function")
        return b0(e) ? ce : se;
      if (e != null) {
        var t = e.$$typeof;
        if (t === ae)
          return Ie;
        if (t === St)
          return Ct;
      }
      return Me;
    }
    function Ls(e, t) {
      var a = e.alternate;
      a === null ? (a = Qa(e.tag, t, e.key, e.mode), a.elementType = e.elementType, a.type = e.type, a.stateNode = e.stateNode, a._debugSource = e._debugSource, a._debugOwner = e._debugOwner, a._debugHookTypes = e._debugHookTypes, a.alternate = e, e.alternate = a) : (a.pendingProps = t, a.type = e.type, a.flags = He, a.subtreeFlags = He, a.deletions = null, a.actualDuration = 0, a.actualStartTime = -1), a.flags = e.flags & Xn, a.childLanes = e.childLanes, a.lanes = e.lanes, a.child = e.child, a.memoizedProps = e.memoizedProps, a.memoizedState = e.memoizedState, a.updateQueue = e.updateQueue;
      var i = e.dependencies;
      switch (a.dependencies = i === null ? null : {
        lanes: i.lanes,
        firstContext: i.firstContext
      }, a.sibling = e.sibling, a.index = e.index, a.ref = e.ref, a.selfBaseDuration = e.selfBaseDuration, a.treeBaseDuration = e.treeBaseDuration, a._debugNeedsRemount = e._debugNeedsRemount, a.tag) {
        case Me:
        case se:
        case Xe:
          a.type = kf(e.type);
          break;
        case ce:
          a.type = C0(e.type);
          break;
        case Ie:
          a.type = T0(e.type);
          break;
      }
      return a;
    }
    function p_(e, t) {
      e.flags &= Xn | Qt;
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
    function v_(e, t, a) {
      var i;
      return e === Yh ? (i = Oe, t === !0 && (i |= ut, i |= ta)) : i = De, ea && (i |= We), Qa($, null, null, i);
    }
    function D0(e, t, a, i, u, s) {
      var f = Me, p = e;
      if (typeof e == "function")
        b0(e) ? (f = ce, p = C0(p)) : p = kf(p);
      else if (typeof e == "string")
        f = re;
      else
        e: switch (e) {
          case Fa:
            return go(a.children, u, s, t);
          case ji:
            f = Ge, u |= ut, (u & Oe) !== De && (u |= ta);
            break;
          case Cl:
            return h_(a, u, s, t);
          case ze:
            return m_(a, u, s, t);
          case dt:
            return y_(a, u, s, t);
          case It:
            return nT(a, u, s, t);
          case tn:
          case it:
          case Or:
          case Bi:
          case Hn:
          default: {
            if (typeof e == "object" && e !== null)
              switch (e.$$typeof) {
                case R:
                  f = Ee;
                  break e;
                case G:
                  f = wt;
                  break e;
                case ae:
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
    function h_(e, t, a, i) {
      typeof e.id != "string" && S('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeof e.id);
      var u = Qa(ot, e, i, t | We);
      return u.elementType = Cl, u.lanes = a, u.stateNode = {
        effectDuration: 0,
        passiveEffectDuration: 0
      }, u;
    }
    function m_(e, t, a, i) {
      var u = Qa(Ne, e, i, t);
      return u.elementType = ze, u.lanes = a, u;
    }
    function y_(e, t, a, i) {
      var u = Qa(Et, e, i, t);
      return u.elementType = dt, u.lanes = a, u;
    }
    function nT(e, t, a, i) {
      var u = Qa(oe, e, i, t);
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
    function g_() {
      var e = Qa(re, null, null, De);
      return e.elementType = "DELETED", e;
    }
    function S_(e) {
      var t = Qa(pt, null, null, De);
      return t.stateNode = e, t;
    }
    function O0(e, t, a) {
      var i = e.children !== null ? e.children : [], u = Qa(ue, i, e.key, t);
      return u.lanes = a, u.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        // Used by persistent updates
        implementation: e.implementation
      }, u;
    }
    function rT(e, t) {
      return e === null && (e = Qa(Me, null, null, De)), e.tag = t.tag, e.key = t.key, e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.return = t.return, e.child = t.child, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.pendingProps = t.pendingProps, e.memoizedProps = t.memoizedProps, e.updateQueue = t.updateQueue, e.memoizedState = t.memoizedState, e.dependencies = t.dependencies, e.mode = t.mode, e.flags = t.flags, e.subtreeFlags = t.subtreeFlags, e.deletions = t.deletions, e.lanes = t.lanes, e.childLanes = t.childLanes, e.alternate = t.alternate, e.actualDuration = t.actualDuration, e.actualStartTime = t.actualStartTime, e.selfBaseDuration = t.selfBaseDuration, e.treeBaseDuration = t.treeBaseDuration, e._debugSource = t._debugSource, e._debugOwner = t._debugOwner, e._debugNeedsRemount = t._debugNeedsRemount, e._debugHookTypes = t._debugHookTypes, e;
    }
    function E_(e, t, a, i, u) {
      this.tag = t, this.containerInfo = e, this.pendingChildren = null, this.current = null, this.pingCache = null, this.finishedWork = null, this.timeoutHandle = fg, this.context = null, this.pendingContext = null, this.callbackNode = null, this.callbackPriority = Tn, this.eventTimes = ns(I), this.expirationTimes = ns($t), this.pendingLanes = I, this.suspendedLanes = I, this.pingedLanes = I, this.expiredLanes = I, this.mutableReadLanes = I, this.finishedLanes = I, this.entangledLanes = I, this.entanglements = ns(I), this.identifierPrefix = i, this.onRecoverableError = u, this.mutableSourceEagerHydrationData = null, this.effectDuration = 0, this.passiveEffectDuration = 0;
      {
        this.memoizedUpdaters = /* @__PURE__ */ new Set();
        for (var s = this.pendingUpdatersLaneMap = [], f = 0; f < Xo; f++)
          s.push(/* @__PURE__ */ new Set());
      }
      switch (t) {
        case Yh:
          this._debugRootType = a ? "hydrateRoot()" : "createRoot()";
          break;
        case ao:
          this._debugRootType = a ? "hydrate()" : "render()";
          break;
      }
    }
    function aT(e, t, a, i, u, s, f, p, v, g) {
      var E = new E_(e, t, a, p, v), _ = v_(t, s);
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
    function C_(e, t, a) {
      var i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
      return M(i), {
        // This tag allow us to uniquely identify this as a React Portal
        $$typeof: Gr,
        key: i == null ? null : "" + i,
        children: e,
        containerInfo: t,
        implementation: a
      };
    }
    var M0, N0;
    M0 = !1, N0 = {};
    function iT(e) {
      if (!e)
        return Ia;
      var t = ma(e), a = rw(t);
      if (t.tag === ce) {
        var i = t.type;
        if (ul(i))
          return ME(t, i, a);
      }
      return a;
    }
    function T_(e, t) {
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
              f ? zt(f) : bn();
            }
          }
        }
        return u.stateNode;
      }
    }
    function lT(e, t, a, i, u, s, f, p) {
      var v = !1, g = null;
      return aT(e, t, v, g, a, i, u, s, f);
    }
    function uT(e, t, a, i, u, s, f, p, v, g) {
      var E = !0, _ = aT(a, i, E, e, u, s, f, p, v);
      _.context = iT(null);
      var b = _.current, U = ia(), H = mo(b), j = eu(U, H);
      return j.callback = t ?? null, uo(b, j, H), kD(_, H, U), _;
    }
    function Bp(e, t, a, i) {
      gd(t, e);
      var u = t.current, s = ia(), f = mo(u);
      Cd(f);
      var p = iT(a);
      t.context === null ? t.context = p : t.pendingContext = p, pa && Sn !== null && !M0 && (M0 = !0, S(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`, et(Sn) || "Unknown"));
      var v = eu(s, f);
      v.payload = {
        element: e
      }, i = i === void 0 ? null : i, i !== null && (typeof i != "function" && S("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", i), v.callback = i);
      var g = uo(u, v, f);
      return g !== null && (lr(g, u, f, s), im(g, u, f)), f;
    }
    function Gm(e) {
      var t = e.current;
      if (!t.child)
        return null;
      switch (t.child.tag) {
        case re:
          return t.child.stateNode;
        default:
          return t.child.stateNode;
      }
    }
    function R_(e) {
      switch (e.tag) {
        case $: {
          var t = e.stateNode;
          if (Uc(t)) {
            var a = xd(t);
            ND(t, a);
          }
          break;
        }
        case Ne: {
          au(function() {
            var u = Oa(e, Ae);
            if (u !== null) {
              var s = ia();
              lr(u, e, Ae, s);
            }
          });
          var i = Ae;
          U0(e, i);
          break;
        }
      }
    }
    function oT(e, t) {
      var a = e.memoizedState;
      a !== null && a.dehydrated !== null && (a.retryLane = nh(a.retryLane, t));
    }
    function U0(e, t) {
      oT(e, t);
      var a = e.alternate;
      a && oT(a, t);
    }
    function x_(e) {
      if (e.tag === Ne) {
        var t = Zo, a = Oa(e, t);
        if (a !== null) {
          var i = ia();
          lr(a, e, t, i);
        }
        U0(e, t);
      }
    }
    function w_(e) {
      if (e.tag === Ne) {
        var t = mo(e), a = Oa(e, t);
        if (a !== null) {
          var i = ia();
          lr(a, e, t, i);
        }
        U0(e, t);
      }
    }
    function sT(e) {
      var t = Hv(e);
      return t === null ? null : t.stateNode;
    }
    var cT = function(e) {
      return null;
    };
    function b_(e) {
      return cT(e);
    }
    var fT = function(e) {
      return !1;
    };
    function D_(e) {
      return fT(e);
    }
    var dT = null, pT = null, vT = null, hT = null, mT = null, yT = null, gT = null, ST = null, ET = null;
    {
      var CT = function(e, t, a) {
        var i = t[a], u = Vn(e) ? e.slice() : lt({}, e);
        return a + 1 === t.length ? (Vn(u) ? u.splice(i, 1) : delete u[i], u) : (u[i] = CT(e[i], t, a + 1), u);
      }, TT = function(e, t) {
        return CT(e, t, 0);
      }, RT = function(e, t, a, i) {
        var u = t[i], s = Vn(e) ? e.slice() : lt({}, e);
        if (i + 1 === t.length) {
          var f = a[i];
          s[f] = s[u], Vn(s) ? s.splice(u, 1) : delete s[u];
        } else
          s[u] = RT(
            // $FlowFixMe number or string is fine here
            e[u],
            t,
            a,
            i + 1
          );
        return s;
      }, xT = function(e, t, a) {
        if (t.length !== a.length) {
          z("copyWithRename() expects paths of the same length");
          return;
        } else
          for (var i = 0; i < a.length - 1; i++)
            if (t[i] !== a[i]) {
              z("copyWithRename() expects paths to be the same except for the deepest key");
              return;
            }
        return RT(e, t, a, 0);
      }, wT = function(e, t, a, i) {
        if (a >= t.length)
          return i;
        var u = t[a], s = Vn(e) ? e.slice() : lt({}, e);
        return s[u] = wT(e[u], t, a + 1, i), s;
      }, bT = function(e, t, a) {
        return wT(e, t, 0, a);
      }, z0 = function(e, t) {
        for (var a = e.memoizedState; a !== null && t > 0; )
          a = a.next, t--;
        return a;
      };
      dT = function(e, t, a, i) {
        var u = z0(e, t);
        if (u !== null) {
          var s = bT(u.memoizedState, a, i);
          u.memoizedState = s, u.baseState = s, e.memoizedProps = lt({}, e.memoizedProps);
          var f = Oa(e, Ae);
          f !== null && lr(f, e, Ae, $t);
        }
      }, pT = function(e, t, a) {
        var i = z0(e, t);
        if (i !== null) {
          var u = TT(i.memoizedState, a);
          i.memoizedState = u, i.baseState = u, e.memoizedProps = lt({}, e.memoizedProps);
          var s = Oa(e, Ae);
          s !== null && lr(s, e, Ae, $t);
        }
      }, vT = function(e, t, a, i) {
        var u = z0(e, t);
        if (u !== null) {
          var s = xT(u.memoizedState, a, i);
          u.memoizedState = s, u.baseState = s, e.memoizedProps = lt({}, e.memoizedProps);
          var f = Oa(e, Ae);
          f !== null && lr(f, e, Ae, $t);
        }
      }, hT = function(e, t, a) {
        e.pendingProps = bT(e.memoizedProps, t, a), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var i = Oa(e, Ae);
        i !== null && lr(i, e, Ae, $t);
      }, mT = function(e, t) {
        e.pendingProps = TT(e.memoizedProps, t), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var a = Oa(e, Ae);
        a !== null && lr(a, e, Ae, $t);
      }, yT = function(e, t, a) {
        e.pendingProps = xT(e.memoizedProps, t, a), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var i = Oa(e, Ae);
        i !== null && lr(i, e, Ae, $t);
      }, gT = function(e) {
        var t = Oa(e, Ae);
        t !== null && lr(t, e, Ae, $t);
      }, ST = function(e) {
        cT = e;
      }, ET = function(e) {
        fT = e;
      };
    }
    function __(e) {
      var t = Ea(e);
      return t === null ? null : t.stateNode;
    }
    function k_(e) {
      return null;
    }
    function O_() {
      return Sn;
    }
    function L_(e) {
      var t = e.findFiberByHostInstance, a = y.ReactCurrentDispatcher;
      return yd({
        bundleType: e.bundleType,
        version: e.version,
        rendererPackageName: e.rendererPackageName,
        rendererConfig: e.rendererConfig,
        overrideHookState: dT,
        overrideHookStateDeletePath: pT,
        overrideHookStateRenamePath: vT,
        overrideProps: hT,
        overridePropsDeletePath: mT,
        overridePropsRenamePath: yT,
        setErrorHandler: ST,
        setSuspenseHandler: ET,
        scheduleUpdate: gT,
        currentDispatcherRef: a,
        findHostInstanceByFiber: __,
        findFiberByHostInstance: t || k_,
        // React Refresh
        findHostInstancesForRefresh: u_,
        scheduleRefresh: i_,
        scheduleRoot: l_,
        setRefreshHandler: a_,
        // Enables DevTools to append owner stacks to error messages in DEV mode.
        getCurrentFiber: O_,
        // Enables DevTools to detect reconciler version rather than renderer version
        // which may not match for third party renderers.
        reconcilerVersion: L0
      });
    }
    var DT = typeof reportError == "function" ? (
      // In modern browsers, reportError will dispatch an error event,
      // emulating an uncaught JavaScript error.
      reportError
    ) : function(e) {
      console.error(e);
    };
    function A0(e) {
      this._internalRoot = e;
    }
    qm.prototype.render = A0.prototype.render = function(e) {
      var t = this._internalRoot;
      if (t === null)
        throw new Error("Cannot update an unmounted root.");
      {
        typeof arguments[1] == "function" ? S("render(...): does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().") : Xm(arguments[1]) ? S("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root.") : typeof arguments[1] < "u" && S("You passed a second argument to root.render(...) but it only accepts one argument.");
        var a = t.containerInfo;
        if (a.nodeType !== En) {
          var i = sT(t.current);
          i && i.parentNode !== a && S("render(...): It looks like the React-rendered content of the root container was removed without using React. This is not supported and will cause errors. Instead, call root.unmount() to empty a root's container.");
        }
      }
      Bp(e, t, null, null);
    }, qm.prototype.unmount = A0.prototype.unmount = function() {
      typeof arguments[0] == "function" && S("unmount(...): does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().");
      var e = this._internalRoot;
      if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        V1() && S("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."), au(function() {
          Bp(null, e, null, null);
        }), DE(t);
      }
    };
    function M_(e, t) {
      if (!Xm(e))
        throw new Error("createRoot(...): Target container is not a DOM element.");
      _T(e);
      var a = !1, i = !1, u = "", s = DT;
      t != null && (t.hydrate ? z("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof t == "object" && t !== null && t.$$typeof === di && S(`You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`), t.unstable_strictMode === !0 && (a = !0), t.identifierPrefix !== void 0 && (u = t.identifierPrefix), t.onRecoverableError !== void 0 && (s = t.onRecoverableError), t.transitionCallbacks !== void 0 && t.transitionCallbacks);
      var f = lT(e, Yh, null, a, i, u, s);
      Fh(f.current, e);
      var p = e.nodeType === En ? e.parentNode : e;
      return Wd(p), new A0(f);
    }
    function qm(e) {
      this._internalRoot = e;
    }
    function N_(e) {
      e && Hy(e);
    }
    qm.prototype.unstable_scheduleHydration = N_;
    function U_(e, t, a) {
      if (!Xm(e))
        throw new Error("hydrateRoot(...): Target container is not a DOM element.");
      _T(e), t === void 0 && S("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
      var i = a ?? null, u = a != null && a.hydratedSources || null, s = !1, f = !1, p = "", v = DT;
      a != null && (a.unstable_strictMode === !0 && (s = !0), a.identifierPrefix !== void 0 && (p = a.identifierPrefix), a.onRecoverableError !== void 0 && (v = a.onRecoverableError));
      var g = uT(t, null, e, Yh, i, s, f, p, v);
      if (Fh(g.current, e), Wd(e), u)
        for (var E = 0; E < u.length; E++) {
          var _ = u[E];
          Hw(g, _);
        }
      return new qm(g);
    }
    function Xm(e) {
      return !!(e && (e.nodeType === Lr || e.nodeType === Ba || e.nodeType === wl || !gt));
    }
    function Pp(e) {
      return !!(e && (e.nodeType === Lr || e.nodeType === Ba || e.nodeType === wl || e.nodeType === En && e.nodeValue === " react-mount-point-unstable "));
    }
    function _T(e) {
      e.nodeType === Lr && e.tagName && e.tagName.toUpperCase() === "BODY" && S("createRoot(): Creating roots directly with document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try using a container element created for your app."), ap(e) && (e._reactRootContainer ? S("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : S("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
    }
    var z_ = y.ReactCurrentOwner, kT;
    kT = function(e) {
      if (e._reactRootContainer && e.nodeType !== En) {
        var t = sT(e._reactRootContainer.current);
        t && t.parentNode !== e && S("render(...): It looks like the React-rendered content of this container was removed without using React. This is not supported and will cause errors. Instead, call ReactDOM.unmountComponentAtNode to empty a container.");
      }
      var a = !!e._reactRootContainer, i = F0(e), u = !!(i && no(i));
      u && !a && S("render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render."), e.nodeType === Lr && e.tagName && e.tagName.toUpperCase() === "BODY" && S("render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.");
    };
    function F0(e) {
      return e ? e.nodeType === Ba ? e.documentElement : e.firstChild : null;
    }
    function OT() {
    }
    function A_(e, t, a, i, u) {
      if (u) {
        if (typeof i == "function") {
          var s = i;
          i = function() {
            var b = Gm(f);
            s.call(b);
          };
        }
        var f = uT(
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
          OT
        );
        e._reactRootContainer = f, Fh(f.current, e);
        var p = e.nodeType === En ? e.parentNode : e;
        return Wd(p), au(), f;
      } else {
        for (var v; v = e.lastChild; )
          e.removeChild(v);
        if (typeof i == "function") {
          var g = i;
          i = function() {
            var b = Gm(E);
            g.call(b);
          };
        }
        var E = lT(
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
          OT
        );
        e._reactRootContainer = E, Fh(E.current, e);
        var _ = e.nodeType === En ? e.parentNode : e;
        return Wd(_), au(function() {
          Bp(t, E, a, i);
        }), E;
      }
    }
    function F_(e, t) {
      e !== null && typeof e != "function" && S("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e);
    }
    function Km(e, t, a, i, u) {
      kT(a), F_(u === void 0 ? null : u, "render");
      var s = a._reactRootContainer, f;
      if (!s)
        f = A_(a, t, e, u, i);
      else {
        if (f = s, typeof u == "function") {
          var p = u;
          u = function() {
            var v = Gm(f);
            p.call(v);
          };
        }
        Bp(t, f, e, u);
      }
      return Gm(f);
    }
    var LT = !1;
    function H_(e) {
      {
        LT || (LT = !0, S("findDOMNode is deprecated and will be removed in the next major release. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node"));
        var t = z_.current;
        if (t !== null && t.stateNode !== null) {
          var a = t.stateNode._warnedAboutRefsInRender;
          a || S("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Nt(t.type) || "A component"), t.stateNode._warnedAboutRefsInRender = !0;
        }
      }
      return e == null ? null : e.nodeType === Lr ? e : T_(e, "findDOMNode");
    }
    function V_(e, t, a) {
      if (S("ReactDOM.hydrate is no longer supported in React 18. Use hydrateRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Pp(t))
        throw new Error("Target container is not a DOM element.");
      {
        var i = ap(t) && t._reactRootContainer === void 0;
        i && S("You are calling ReactDOM.hydrate() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call hydrateRoot(container, element)?");
      }
      return Km(null, e, t, !0, a);
    }
    function j_(e, t, a) {
      if (S("ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Pp(t))
        throw new Error("Target container is not a DOM element.");
      {
        var i = ap(t) && t._reactRootContainer === void 0;
        i && S("You are calling ReactDOM.render() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.render(element)?");
      }
      return Km(null, e, t, !1, a);
    }
    function B_(e, t, a, i) {
      if (S("ReactDOM.unstable_renderSubtreeIntoContainer() is no longer supported in React 18. Consider using a portal instead. Until you switch to the createRoot API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Pp(a))
        throw new Error("Target container is not a DOM element.");
      if (e == null || !$o(e))
        throw new Error("parentComponent must be a valid React Component");
      return Km(e, t, a, !1, i);
    }
    var MT = !1;
    function P_(e) {
      if (MT || (MT = !0, S("unmountComponentAtNode is deprecated and will be removed in the next major release. Switch to the createRoot API. Learn more: https://reactjs.org/link/switch-to-createroot")), !Pp(e))
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
          Km(null, null, e, !1, function() {
            e._reactRootContainer = null, DE(e);
          });
        }), !0;
      } else {
        {
          var u = F0(e), s = !!(u && no(u)), f = e.nodeType === Lr && Pp(e.parentNode) && !!e.parentNode._reactRootContainer;
          s && S("unmountComponentAtNode(): The node you're attempting to unmount was rendered by React and is not a top-level container. %s", f ? "You may have accidentally passed in a React root node instead of its container." : "Instead, have the parent component update its state and rerender in order to remove this component.");
        }
        return !1;
      }
    }
    Pu(R_), Ay(x_), Ac(w_), ih(xa), lh(pr), (typeof Map != "function" || // $FlowIssue Flow incorrectly thinks Map has no prototype
    Map.prototype == null || typeof Map.prototype.forEach != "function" || typeof Set != "function" || // $FlowIssue Flow incorrectly thinks Set has no prototype
    Set.prototype == null || typeof Set.prototype.clear != "function" || typeof Set.prototype.forEach != "function") && S("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), zv(YR), Js(v0, UD, au);
    function $_(e, t) {
      var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
      if (!Xm(t))
        throw new Error("Target container is not a DOM element.");
      return C_(e, t, null, a);
    }
    function Y_(e, t, a, i) {
      return B_(e, t, a, i);
    }
    var H0 = {
      usingClientEntryPoint: !1,
      // Keep in sync with ReactTestUtils.js.
      // This is an array for better minification.
      Events: [no, lf, Hh, Zs, jo, v0]
    };
    function I_(e, t) {
      return H0.usingClientEntryPoint || S('You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), M_(e, t);
    }
    function Q_(e, t, a) {
      return H0.usingClientEntryPoint || S('You are importing hydrateRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), U_(e, t, a);
    }
    function W_(e) {
      return V1() && S("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."), au(e);
    }
    var G_ = L_({
      findFiberByHostInstance: ms,
      bundleType: 1,
      version: L0,
      rendererPackageName: "react-dom"
    });
    if (!G_ && fn && window.top === window.self && (navigator.userAgent.indexOf("Chrome") > -1 && navigator.userAgent.indexOf("Edge") === -1 || navigator.userAgent.indexOf("Firefox") > -1)) {
      var NT = window.location.protocol;
      /^(https?|file):$/.test(NT) && console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools" + (NT === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://reactjs.org/link/react-devtools-faq` : ""), "font-weight:bold");
    }
    za.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = H0, za.createPortal = $_, za.createRoot = I_, za.findDOMNode = H_, za.flushSync = W_, za.hydrate = V_, za.hydrateRoot = Q_, za.render = j_, za.unmountComponentAtNode = P_, za.unstable_batchedUpdates = v0, za.unstable_renderSubtreeIntoContainer = Y_, za.version = L0, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), za;
}
function JT() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) {
    if (process.env.NODE_ENV !== "production")
      throw new Error("^_^");
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(JT);
    } catch (h) {
      console.error(h);
    }
  }
}
process.env.NODE_ENV === "production" ? (JT(), Q0.exports = J_()) : Q0.exports = ek();
var tk = Q0.exports, W0, Jm = tk;
if (process.env.NODE_ENV === "production")
  W0 = Jm.createRoot, Jm.hydrateRoot;
else {
  var VT = Jm.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  W0 = function(h, T) {
    VT.usingClientEntryPoint = !0;
    try {
      return Jm.createRoot(h, T);
    } finally {
      VT.usingClientEntryPoint = !1;
    }
  };
}
var nk = Object.defineProperty, rk = (h, T, y) => T in h ? nk(h, T, { enumerable: !0, configurable: !0, writable: !0, value: y }) : h[T] = y, ey = (h, T, y) => (rk(h, typeof T != "symbol" ? T + "" : T, y), y);
const ak = {
  stringify: (h) => h,
  parse: (h) => h
}, ik = {
  stringify: (h) => `${h}`,
  parse: (h) => parseFloat(h)
}, lk = {
  stringify: (h) => h ? "true" : "false",
  parse: (h) => /^[ty1-9]/i.test(h)
}, uk = {
  stringify: (h) => h.name,
  parse: (h, T, y) => {
    const A = (() => {
      if (typeof window < "u" && h in window)
        return window[h];
      if (typeof global < "u" && h in global)
        return global[h];
    })();
    return typeof A == "function" ? A.bind(y) : void 0;
  }
}, ok = {
  stringify: (h) => JSON.stringify(h),
  parse: (h) => JSON.parse(h)
}, B0 = {
  string: ak,
  number: ik,
  boolean: lk,
  function: uk,
  json: ok
};
function sk(h) {
  return h.replace(
    /([a-z0-9])([A-Z])/g,
    (T, y, A) => `${y}-${A.toLowerCase()}`
  );
}
const ty = Symbol.for("r2wc.render"), ny = Symbol.for("r2wc.connected"), Ms = Symbol.for("r2wc.context"), So = Symbol.for("r2wc.props");
function ck(h, T, y) {
  var A, Y, z;
  T.props || (T.props = h.propTypes ? Object.keys(h.propTypes) : []);
  const S = Array.isArray(T.props) ? T.props.slice() : Object.keys(T.props), pe = {}, se = {}, ce = {};
  for (const $ of S) {
    pe[$] = Array.isArray(T.props) ? "string" : T.props[$];
    const ue = sk($);
    se[$] = ue, ce[ue] = $;
  }
  class Me extends HTMLElement {
    constructor() {
      super(), ey(this, A, !0), ey(this, Y), ey(this, z, {}), ey(this, "container"), T.shadow ? this.container = this.attachShadow({
        mode: T.shadow
      }) : this.container = this, this[So].container = this.container;
      for (const ue of S) {
        const re = se[ue], xe = this.getAttribute(re), Ze = pe[ue], Ge = Ze ? B0[Ze] : null;
        Ge != null && Ge.parse && xe && (this[So][ue] = Ge.parse(xe, re, this));
      }
    }
    static get observedAttributes() {
      return Object.keys(ce);
    }
    connectedCallback() {
      this[ny] = !0, this[ty]();
    }
    disconnectedCallback() {
      this[ny] = !1, this[Ms] && y.unmount(this[Ms]), delete this[Ms];
    }
    attributeChangedCallback(ue, re, xe) {
      const Ze = ce[ue], Ge = pe[Ze], wt = Ge ? B0[Ge] : null;
      Ze in pe && wt != null && wt.parse && xe && (this[So][Ze] = wt.parse(xe, ue, this), this[ty]());
    }
    [(A = ny, Y = Ms, z = So, ty)]() {
      this[ny] && (this[Ms] ? y.update(this[Ms], this[So]) : this[Ms] = y.mount(
        this.container,
        h,
        this[So]
      ));
    }
  }
  for (const $ of S) {
    const ue = se[$], re = pe[$];
    Object.defineProperty(Me.prototype, $, {
      enumerable: !0,
      configurable: !0,
      get() {
        return this[So][$];
      },
      set(xe) {
        this[So][$] = xe;
        const Ze = re ? B0[re] : null;
        if (Ze != null && Ze.stringify) {
          const Ge = Ze.stringify(xe, ue, this);
          this.getAttribute(ue) !== Ge && this.setAttribute(ue, Ge);
        } else
          this[ty]();
      }
    });
  }
  return Me;
}
function fk(h, T, y) {
  const A = W0(h), Y = hr.createElement(T, y);
  return A.render(Y), {
    root: A,
    ReactComponent: T
  };
}
function dk({ root: h, ReactComponent: T }, y) {
  const A = hr.createElement(T, y);
  h.render(A);
}
function pk({ root: h }) {
  h.unmount();
}
function eR(h, T = {}) {
  return ck(h, T, { mount: fk, update: dk, unmount: pk });
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
var jT;
function vk() {
  if (jT) return Yp;
  jT = 1;
  var h = hr, T = Symbol.for("react.element"), y = Symbol.for("react.fragment"), A = Object.prototype.hasOwnProperty, Y = h.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, z = { key: !0, ref: !0, __self: !0, __source: !0 };
  function S(pe, se, ce) {
    var Me, $ = {}, ue = null, re = null;
    ce !== void 0 && (ue = "" + ce), se.key !== void 0 && (ue = "" + se.key), se.ref !== void 0 && (re = se.ref);
    for (Me in se) A.call(se, Me) && !z.hasOwnProperty(Me) && ($[Me] = se[Me]);
    if (pe && pe.defaultProps) for (Me in se = pe.defaultProps, se) $[Me] === void 0 && ($[Me] = se[Me]);
    return { $$typeof: T, type: pe, key: ue, ref: re, props: $, _owner: Y.current };
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
var BT;
function hk() {
  return BT || (BT = 1, process.env.NODE_ENV !== "production" && function() {
    var h = hr, T = Symbol.for("react.element"), y = Symbol.for("react.portal"), A = Symbol.for("react.fragment"), Y = Symbol.for("react.strict_mode"), z = Symbol.for("react.profiler"), S = Symbol.for("react.provider"), pe = Symbol.for("react.context"), se = Symbol.for("react.forward_ref"), ce = Symbol.for("react.suspense"), Me = Symbol.for("react.suspense_list"), $ = Symbol.for("react.memo"), ue = Symbol.for("react.lazy"), re = Symbol.for("react.offscreen"), xe = Symbol.iterator, Ze = "@@iterator";
    function Ge(R) {
      if (R === null || typeof R != "object")
        return null;
      var G = xe && R[xe] || R[Ze];
      return typeof G == "function" ? G : null;
    }
    var wt = h.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function Ee(R) {
      {
        for (var G = arguments.length, ae = new Array(G > 1 ? G - 1 : 0), ze = 1; ze < G; ze++)
          ae[ze - 1] = arguments[ze];
        Ie("error", R, ae);
      }
    }
    function Ie(R, G, ae) {
      {
        var ze = wt.ReactDebugCurrentFrame, dt = ze.getStackAddendum();
        dt !== "" && (G += "%s", ae = ae.concat([dt]));
        var St = ae.map(function($e) {
          return String($e);
        });
        St.unshift("Warning: " + G), Function.prototype.apply.call(console[R], console, St);
      }
    }
    var ot = !1, Ne = !1, Ct = !1, Xe = !1, Yt = !1, Jt;
    Jt = Symbol.for("react.module.reference");
    function pt(R) {
      return !!(typeof R == "string" || typeof R == "function" || R === A || R === z || Yt || R === Y || R === ce || R === Me || Xe || R === re || ot || Ne || Ct || typeof R == "object" && R !== null && (R.$$typeof === ue || R.$$typeof === $ || R.$$typeof === S || R.$$typeof === pe || R.$$typeof === se || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      R.$$typeof === Jt || R.getModuleId !== void 0));
    }
    function Et(R, G, ae) {
      var ze = R.displayName;
      if (ze)
        return ze;
      var dt = G.displayName || G.name || "";
      return dt !== "" ? ae + "(" + dt + ")" : ae;
    }
    function Ve(R) {
      return R.displayName || "Context";
    }
    function oe(R) {
      if (R == null)
        return null;
      if (typeof R.tag == "number" && Ee("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof R == "function")
        return R.displayName || R.name || null;
      if (typeof R == "string")
        return R;
      switch (R) {
        case A:
          return "Fragment";
        case y:
          return "Portal";
        case z:
          return "Profiler";
        case Y:
          return "StrictMode";
        case ce:
          return "Suspense";
        case Me:
          return "SuspenseList";
      }
      if (typeof R == "object")
        switch (R.$$typeof) {
          case pe:
            var G = R;
            return Ve(G) + ".Consumer";
          case S:
            var ae = R;
            return Ve(ae._context) + ".Provider";
          case se:
            return Et(R, R.render, "ForwardRef");
          case $:
            var ze = R.displayName || null;
            return ze !== null ? ze : oe(R.type) || "Memo";
          case ue: {
            var dt = R, St = dt._payload, $e = dt._init;
            try {
              return oe($e(St));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var Fe = Object.assign, vt = 0, st, Ut, ee, ke, fe, ht, gt;
    function xn() {
    }
    xn.__reactDisabledLog = !0;
    function Un() {
      {
        if (vt === 0) {
          st = console.log, Ut = console.info, ee = console.warn, ke = console.error, fe = console.group, ht = console.groupCollapsed, gt = console.groupEnd;
          var R = {
            configurable: !0,
            enumerable: !0,
            value: xn,
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
              value: ke
            }),
            group: Fe({}, R, {
              value: fe
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
    var en = wt.ReactCurrentDispatcher, mr;
    function gn(R, G, ae) {
      {
        if (mr === void 0)
          try {
            throw Error();
          } catch (dt) {
            var ze = dt.stack.trim().match(/\n( *(at )?)/);
            mr = ze && ze[1] || "";
          }
        return `
` + mr + R;
      }
    }
    var Wn = !1, fa;
    {
      var Gn = typeof WeakMap == "function" ? WeakMap : Map;
      fa = new Gn();
    }
    function _r(R, G) {
      if (!R || Wn)
        return "";
      {
        var ae = fa.get(R);
        if (ae !== void 0)
          return ae;
      }
      var ze;
      Wn = !0;
      var dt = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var St;
      St = en.current, en.current = null, Un();
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
            } catch (or) {
              ze = or;
            }
            Reflect.construct(R, [], $e);
          } else {
            try {
              $e.call();
            } catch (or) {
              ze = or;
            }
            R.call($e.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (or) {
            ze = or;
          }
          R();
        }
      } catch (or) {
        if (or && ze && typeof or.stack == "string") {
          for (var it = or.stack.split(`
`), Hn = ze.stack.split(`
`), It = it.length - 1, tn = Hn.length - 1; It >= 1 && tn >= 0 && it[It] !== Hn[tn]; )
            tn--;
          for (; It >= 1 && tn >= 0; It--, tn--)
            if (it[It] !== Hn[tn]) {
              if (It !== 1 || tn !== 1)
                do
                  if (It--, tn--, tn < 0 || it[It] !== Hn[tn]) {
                    var Or = `
` + it[It].replace(" at new ", " at ");
                    return R.displayName && Or.includes("<anonymous>") && (Or = Or.replace("<anonymous>", R.displayName)), typeof R == "function" && fa.set(R, Or), Or;
                  }
                while (It >= 1 && tn >= 0);
              break;
            }
        }
      } finally {
        Wn = !1, en.current = St, ca(), Error.prepareStackTrace = dt;
      }
      var Bi = R ? R.displayName || R.name : "", kt = Bi ? gn(Bi) : "";
      return typeof R == "function" && fa.set(R, kt), kt;
    }
    function fn(R, G, ae) {
      return _r(R, !1);
    }
    function wn(R) {
      var G = R.prototype;
      return !!(G && G.isReactComponent);
    }
    function zn(R, G, ae) {
      if (R == null)
        return "";
      if (typeof R == "function")
        return _r(R, wn(R));
      if (typeof R == "string")
        return gn(R);
      switch (R) {
        case ce:
          return gn("Suspense");
        case Me:
          return gn("SuspenseList");
      }
      if (typeof R == "object")
        switch (R.$$typeof) {
          case se:
            return fn(R.render);
          case $:
            return zn(R.type, G, ae);
          case ue: {
            var ze = R, dt = ze._payload, St = ze._init;
            try {
              return zn(St(dt), G, ae);
            } catch {
            }
          }
        }
      return "";
    }
    var An = Object.prototype.hasOwnProperty, qn = {}, x = wt.ReactDebugCurrentFrame;
    function M(R) {
      if (R) {
        var G = R._owner, ae = zn(R.type, R._source, G ? G.type : null);
        x.setExtraStackFrame(ae);
      } else
        x.setExtraStackFrame(null);
    }
    function V(R, G, ae, ze, dt) {
      {
        var St = Function.call.bind(An);
        for (var $e in R)
          if (St(R, $e)) {
            var it = void 0;
            try {
              if (typeof R[$e] != "function") {
                var Hn = Error((ze || "React class") + ": " + ae + " type `" + $e + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof R[$e] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw Hn.name = "Invariant Violation", Hn;
              }
              it = R[$e](G, $e, ze, ae, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (It) {
              it = It;
            }
            it && !(it instanceof Error) && (M(dt), Ee("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", ze || "React class", ae, $e, typeof it), M(null)), it instanceof Error && !(it.message in qn) && (qn[it.message] = !0, M(dt), Ee("Failed %s type: %s", ae, it.message), M(null));
          }
      }
    }
    var te = Array.isArray;
    function Z(R) {
      return te(R);
    }
    function q(R) {
      {
        var G = typeof Symbol == "function" && Symbol.toStringTag, ae = G && R[Symbol.toStringTag] || R.constructor.name || "Object";
        return ae;
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
    }, Ga, yr, ne;
    ne = {};
    function Ue(R) {
      if (An.call(R, "ref")) {
        var G = Object.getOwnPropertyDescriptor(R, "ref").get;
        if (G && G.isReactWarning)
          return !1;
      }
      return R.ref !== void 0;
    }
    function rt(R) {
      if (An.call(R, "key")) {
        var G = Object.getOwnPropertyDescriptor(R, "key").get;
        if (G && G.isReactWarning)
          return !1;
      }
      return R.key !== void 0;
    }
    function bt(R, G) {
      if (typeof R.ref == "string" && at.current && G && at.current.stateNode !== G) {
        var ae = oe(at.current.type);
        ne[ae] || (Ee('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', oe(at.current.type), R.ref), ne[ae] = !0);
      }
    }
    function jt(R, G) {
      {
        var ae = function() {
          Ga || (Ga = !0, Ee("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", G));
        };
        ae.isReactWarning = !0, Object.defineProperty(R, "key", {
          get: ae,
          configurable: !0
        });
      }
    }
    function Fn(R, G) {
      {
        var ae = function() {
          yr || (yr = !0, Ee("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", G));
        };
        ae.isReactWarning = !0, Object.defineProperty(R, "ref", {
          get: ae,
          configurable: !0
        });
      }
    }
    var pn = function(R, G, ae, ze, dt, St, $e) {
      var it = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: T,
        // Built-in properties that belong on the element
        type: R,
        key: G,
        ref: ae,
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
    function kr(R, G, ae, ze, dt) {
      {
        var St, $e = {}, it = null, Hn = null;
        ae !== void 0 && (_t(ae), it = "" + ae), rt(G) && (_t(G.key), it = "" + G.key), Ue(G) && (Hn = G.ref, bt(G, dt));
        for (St in G)
          An.call(G, St) && !dn.hasOwnProperty(St) && ($e[St] = G[St]);
        if (R && R.defaultProps) {
          var It = R.defaultProps;
          for (St in It)
            $e[St] === void 0 && ($e[St] = It[St]);
        }
        if (it || Hn) {
          var tn = typeof R == "function" ? R.displayName || R.name || "Unknown" : R;
          it && jt($e, tn), Hn && Fn($e, tn);
        }
        return pn(R, it, Hn, dt, ze, at.current, $e);
      }
    }
    var Bt = wt.ReactCurrentOwner, Wr = wt.ReactDebugCurrentFrame;
    function Ht(R) {
      if (R) {
        var G = R._owner, ae = zn(R.type, R._source, G ? G.type : null);
        Wr.setExtraStackFrame(ae);
      } else
        Wr.setExtraStackFrame(null);
    }
    var Pt;
    Pt = !1;
    function su(R) {
      return typeof R == "object" && R !== null && R.$$typeof === T;
    }
    function gl() {
      {
        if (Bt.current) {
          var R = oe(Bt.current.type);
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
          var ae = typeof R == "string" ? R : R.displayName || R.name;
          ae && (G = `

Check the top-level render call using <` + ae + ">.");
        }
        return G;
      }
    }
    function Sl(R, G) {
      {
        if (!R._store || R._store.validated || R.key != null)
          return;
        R._store.validated = !0;
        var ae = Ns(G);
        if (Co[ae])
          return;
        Co[ae] = !0;
        var ze = "";
        R && R._owner && R._owner !== Bt.current && (ze = " It was passed a child from " + oe(R._owner.type) + "."), Ht(R), Ee('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', ae, ze), Ht(null);
      }
    }
    function fu(R, G) {
      {
        if (typeof R != "object")
          return;
        if (Z(R))
          for (var ae = 0; ae < R.length; ae++) {
            var ze = R[ae];
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
        var ae;
        if (typeof G == "function")
          ae = G.propTypes;
        else if (typeof G == "object" && (G.$$typeof === se || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        G.$$typeof === $))
          ae = G.propTypes;
        else
          return;
        if (ae) {
          var ze = oe(G);
          V(ae, R.props, "prop", ze, R);
        } else if (G.PropTypes !== void 0 && !Pt) {
          Pt = !0;
          var dt = oe(G);
          Ee("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", dt || "Unknown");
        }
        typeof G.getDefaultProps == "function" && !G.getDefaultProps.isReactClassApproved && Ee("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function du(R) {
      {
        for (var G = Object.keys(R.props), ae = 0; ae < G.length; ae++) {
          var ze = G[ae];
          if (ze !== "children" && ze !== "key") {
            Ht(R), Ee("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", ze), Ht(null);
            break;
          }
        }
        R.ref !== null && (Ht(R), Ee("Invalid attribute `ref` supplied to `React.Fragment`."), Ht(null));
      }
    }
    var qa = {};
    function di(R, G, ae, ze, dt, St) {
      {
        var $e = pt(R);
        if (!$e) {
          var it = "";
          (R === void 0 || typeof R == "object" && R !== null && Object.keys(R).length === 0) && (it += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var Hn = cu();
          Hn ? it += Hn : it += gl();
          var It;
          R === null ? It = "null" : Z(R) ? It = "array" : R !== void 0 && R.$$typeof === T ? (It = "<" + (oe(R.type) || "Unknown") + " />", it = " Did you accidentally export a JSX literal instead of a component?") : It = typeof R, Ee("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", It, it);
        }
        var tn = kr(R, G, ae, dt, St);
        if (tn == null)
          return tn;
        if ($e) {
          var Or = G.children;
          if (Or !== void 0)
            if (ze)
              if (Z(Or)) {
                for (var Bi = 0; Bi < Or.length; Bi++)
                  fu(Or[Bi], R);
                Object.freeze && Object.freeze(Or);
              } else
                Ee("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              fu(Or, R);
        }
        if (An.call(G, "key")) {
          var kt = oe(R), or = Object.keys(G).filter(function(Xa) {
            return Xa !== "key";
          }), qr = or.length > 0 ? "{key: someKey, " + or.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!qa[kt + qr]) {
            var lt = or.length > 0 ? "{" + or.join(": ..., ") + ": ...}" : "{}";
            Ee(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, qr, kt, lt, kt), qa[kt + qr] = !0;
          }
        }
        return R === A ? du(tn) : El(tn), tn;
      }
    }
    function Gr(R, G, ae) {
      return di(R, G, ae, !0);
    }
    function Fa(R, G, ae) {
      return di(R, G, ae, !1);
    }
    var ji = Fa, Cl = Gr;
    Ip.Fragment = A, Ip.jsx = ji, Ip.jsxs = Cl;
  }()), Ip;
}
process.env.NODE_ENV === "production" ? G0.exports = vk() : G0.exports = hk();
var oa = G0.exports;
const mk = "_wrapper_5bkbt_1", yk = "_logo_5bkbt_19", gk = "_title_5bkbt_33", P0 = {
  wrapper: mk,
  logo: yk,
  title: gk
}, Sk = ({ text: h, image: T }) => /* @__PURE__ */ oa.jsx("header", { children: /* @__PURE__ */ oa.jsxs("div", { className: P0.wrapper, children: [
  /* @__PURE__ */ oa.jsx("div", { children: /* @__PURE__ */ oa.jsx("img", { width: 150, height: 150, className: P0.logo, src: T }) }),
  /* @__PURE__ */ oa.jsx("h1", { className: P0.title, children: h })
] }) });
var Gp = (h) => h.type === "checkbox", Mf = (h) => h instanceof Date, sa = (h) => h == null;
const tR = (h) => typeof h == "object";
var Qn = (h) => !sa(h) && !Array.isArray(h) && tR(h) && !Mf(h), Ek = (h) => Qn(h) && h.target ? Gp(h.target) ? h.target.checked : h.target.value : h, Ck = (h) => h.substring(0, h.search(/\.\d+(\.|$)/)) || h, Tk = (h, T) => h.has(Ck(T)), Rk = (h) => {
  const T = h.constructor && h.constructor.prototype;
  return Qn(T) && T.hasOwnProperty("isPrototypeOf");
}, q0 = typeof window < "u" && typeof window.HTMLElement < "u" && typeof document < "u";
function fi(h) {
  let T;
  const y = Array.isArray(h);
  if (h instanceof Date)
    T = new Date(h);
  else if (h instanceof Set)
    T = new Set(h);
  else if (!(q0 && (h instanceof Blob || h instanceof FileList)) && (y || Qn(h)))
    if (T = y ? [] : {}, !y && !Rk(h))
      T = h;
    else
      for (const A in h)
        h.hasOwnProperty(A) && (T[A] = fi(h[A]));
  else
    return h;
  return T;
}
var cy = (h) => Array.isArray(h) ? h.filter(Boolean) : [], Nn = (h) => h === void 0, be = (h, T, y) => {
  if (!T || !Qn(h))
    return y;
  const A = cy(T.split(/[,[\].]+?/)).reduce((Y, z) => sa(Y) ? Y : Y[z], h);
  return Nn(A) || A === h ? Nn(h[T]) ? y : h[T] : A;
}, ml = (h) => typeof h == "boolean", X0 = (h) => /^\w*$/.test(h), nR = (h) => cy(h.replace(/["|']|\]/g, "").split(/\.|\[/)), ln = (h, T, y) => {
  let A = -1;
  const Y = X0(T) ? [T] : nR(T), z = Y.length, S = z - 1;
  for (; ++A < z; ) {
    const pe = Y[A];
    let se = y;
    if (A !== S) {
      const ce = h[pe];
      se = Qn(ce) || Array.isArray(ce) ? ce : isNaN(+Y[A + 1]) ? {} : [];
    }
    if (pe === "__proto__")
      return;
    h[pe] = se, h = h[pe];
  }
  return h;
};
const PT = {
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
};
hr.createContext(null);
var xk = (h, T, y, A = !0) => {
  const Y = {
    defaultValues: T._defaultValues
  };
  for (const z in h)
    Object.defineProperty(Y, z, {
      get: () => {
        const S = z;
        return T._proxyFormState[S] !== Vi.all && (T._proxyFormState[S] = !A || Vi.all), h[S];
      }
    });
  return Y;
}, Aa = (h) => Qn(h) && !Object.keys(h).length, wk = (h, T, y, A) => {
  y(h);
  const { name: Y, ...z } = h;
  return Aa(z) || Object.keys(z).length >= Object.keys(T).length || Object.keys(z).find((S) => T[S] === Vi.all);
}, ay = (h) => Array.isArray(h) ? h : [h];
function bk(h) {
  const T = hr.useRef(h);
  T.current = h, hr.useEffect(() => {
    const y = !h.disabled && T.current.subject && T.current.subject.subscribe({
      next: T.current.next
    });
    return () => {
      y && y.unsubscribe();
    };
  }, [h.disabled]);
}
var yl = (h) => typeof h == "string", Dk = (h, T, y, A, Y) => yl(h) ? (A && T.watch.add(h), be(y, h, Y)) : Array.isArray(h) ? h.map((z) => (A && T.watch.add(z), be(y, z))) : (A && (T.watchAll = !0), y), _k = (h, T, y, A, Y) => T ? {
  ...y[h],
  types: {
    ...y[h] && y[h].types ? y[h].types : {},
    [A]: Y || !0
  }
} : {}, $T = (h) => ({
  isOnSubmit: !h || h === Vi.onSubmit,
  isOnBlur: h === Vi.onBlur,
  isOnChange: h === Vi.onChange,
  isOnAll: h === Vi.all,
  isOnTouch: h === Vi.onTouched
}), YT = (h, T, y) => !y && (T.watchAll || T.watch.has(h) || [...T.watch].some((A) => h.startsWith(A) && /^\.\w+/.test(h.slice(A.length))));
const Wp = (h, T, y, A) => {
  for (const Y of y || Object.keys(h)) {
    const z = be(h, Y);
    if (z) {
      const { _f: S, ...pe } = z;
      if (S) {
        if (S.refs && S.refs[0] && T(S.refs[0], Y) && !A)
          return !0;
        if (S.ref && T(S.ref, S.name) && !A)
          return !0;
        if (Wp(pe, T))
          break;
      } else if (Qn(pe) && Wp(pe, T))
        break;
    }
  }
};
var kk = (h, T, y) => {
  const A = ay(be(h, y));
  return ln(A, "root", T[y]), ln(h, y, A), h;
}, K0 = (h) => h.type === "file", ou = (h) => typeof h == "function", ly = (h) => {
  if (!q0)
    return !1;
  const T = h ? h.ownerDocument : 0;
  return h instanceof (T && T.defaultView ? T.defaultView.HTMLElement : HTMLElement);
}, iy = (h) => yl(h), Z0 = (h) => h.type === "radio", uy = (h) => h instanceof RegExp;
const IT = {
  value: !1,
  isValid: !1
}, QT = { value: !0, isValid: !0 };
var rR = (h) => {
  if (Array.isArray(h)) {
    if (h.length > 1) {
      const T = h.filter((y) => y && y.checked && !y.disabled).map((y) => y.value);
      return { value: T, isValid: !!T.length };
    }
    return h[0].checked && !h[0].disabled ? (
      // @ts-expect-error expected to work in the browser
      h[0].attributes && !Nn(h[0].attributes.value) ? Nn(h[0].value) || h[0].value === "" ? QT : { value: h[0].value, isValid: !0 } : QT
    ) : IT;
  }
  return IT;
};
const WT = {
  isValid: !1,
  value: null
};
var aR = (h) => Array.isArray(h) ? h.reduce((T, y) => y && y.checked && !y.disabled ? {
  isValid: !0,
  value: y.value
} : T, WT) : WT;
function GT(h, T, y = "validate") {
  if (iy(h) || Array.isArray(h) && h.every(iy) || ml(h) && !h)
    return {
      type: y,
      message: iy(h) ? h : "",
      ref: T
    };
}
var Lf = (h) => Qn(h) && !uy(h) ? h : {
  value: h,
  message: ""
}, qT = async (h, T, y, A, Y) => {
  const { ref: z, refs: S, required: pe, maxLength: se, minLength: ce, min: Me, max: $, pattern: ue, validate: re, name: xe, valueAsNumber: Ze, mount: Ge, disabled: wt } = h._f, Ee = be(T, xe);
  if (!Ge || wt)
    return {};
  const Ie = S ? S[0] : z, ot = (Ve) => {
    A && Ie.reportValidity && (Ie.setCustomValidity(ml(Ve) ? "" : Ve || ""), Ie.reportValidity());
  }, Ne = {}, Ct = Z0(z), Xe = Gp(z), Yt = Ct || Xe, Jt = (Ze || K0(z)) && Nn(z.value) && Nn(Ee) || ly(z) && z.value === "" || Ee === "" || Array.isArray(Ee) && !Ee.length, pt = _k.bind(null, xe, y, Ne), Et = (Ve, oe, Fe, vt = uu.maxLength, st = uu.minLength) => {
    const Ut = Ve ? oe : Fe;
    Ne[xe] = {
      type: Ve ? vt : st,
      message: Ut,
      ref: z,
      ...pt(Ve ? vt : st, Ut)
    };
  };
  if (Y ? !Array.isArray(Ee) || !Ee.length : pe && (!Yt && (Jt || sa(Ee)) || ml(Ee) && !Ee || Xe && !rR(S).isValid || Ct && !aR(S).isValid)) {
    const { value: Ve, message: oe } = iy(pe) ? { value: !!pe, message: pe } : Lf(pe);
    if (Ve && (Ne[xe] = {
      type: uu.required,
      message: oe,
      ref: Ie,
      ...pt(uu.required, oe)
    }, !y))
      return ot(oe), Ne;
  }
  if (!Jt && (!sa(Me) || !sa($))) {
    let Ve, oe;
    const Fe = Lf($), vt = Lf(Me);
    if (!sa(Ee) && !isNaN(Ee)) {
      const st = z.valueAsNumber || Ee && +Ee;
      sa(Fe.value) || (Ve = st > Fe.value), sa(vt.value) || (oe = st < vt.value);
    } else {
      const st = z.valueAsDate || new Date(Ee), Ut = (fe) => /* @__PURE__ */ new Date((/* @__PURE__ */ new Date()).toDateString() + " " + fe), ee = z.type == "time", ke = z.type == "week";
      yl(Fe.value) && Ee && (Ve = ee ? Ut(Ee) > Ut(Fe.value) : ke ? Ee > Fe.value : st > new Date(Fe.value)), yl(vt.value) && Ee && (oe = ee ? Ut(Ee) < Ut(vt.value) : ke ? Ee < vt.value : st < new Date(vt.value));
    }
    if ((Ve || oe) && (Et(!!Ve, Fe.message, vt.message, uu.max, uu.min), !y))
      return ot(Ne[xe].message), Ne;
  }
  if ((se || ce) && !Jt && (yl(Ee) || Y && Array.isArray(Ee))) {
    const Ve = Lf(se), oe = Lf(ce), Fe = !sa(Ve.value) && Ee.length > +Ve.value, vt = !sa(oe.value) && Ee.length < +oe.value;
    if ((Fe || vt) && (Et(Fe, Ve.message, oe.message), !y))
      return ot(Ne[xe].message), Ne;
  }
  if (ue && !Jt && yl(Ee)) {
    const { value: Ve, message: oe } = Lf(ue);
    if (uy(Ve) && !Ee.match(Ve) && (Ne[xe] = {
      type: uu.pattern,
      message: oe,
      ref: z,
      ...pt(uu.pattern, oe)
    }, !y))
      return ot(oe), Ne;
  }
  if (re) {
    if (ou(re)) {
      const Ve = await re(Ee, T), oe = GT(Ve, Ie);
      if (oe && (Ne[xe] = {
        ...oe,
        ...pt(uu.validate, oe.message)
      }, !y))
        return ot(oe.message), Ne;
    } else if (Qn(re)) {
      let Ve = {};
      for (const oe in re) {
        if (!Aa(Ve) && !y)
          break;
        const Fe = GT(await re[oe](Ee, T), Ie, oe);
        Fe && (Ve = {
          ...Fe,
          ...pt(oe, Fe.message)
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
function Ok(h, T) {
  const y = T.slice(0, -1).length;
  let A = 0;
  for (; A < y; )
    h = Nn(h) ? A++ : h[T[A++]];
  return h;
}
function Lk(h) {
  for (const T in h)
    if (h.hasOwnProperty(T) && !Nn(h[T]))
      return !1;
  return !0;
}
function ur(h, T) {
  const y = Array.isArray(T) ? T : X0(T) ? [T] : nR(T), A = y.length === 1 ? h : Ok(h, y), Y = y.length - 1, z = y[Y];
  return A && delete A[z], Y !== 0 && (Qn(A) && Aa(A) || Array.isArray(A) && Lk(A)) && ur(h, y.slice(0, -1)), h;
}
var $0 = () => {
  let h = [];
  return {
    get observers() {
      return h;
    },
    next: (Y) => {
      for (const z of h)
        z.next && z.next(Y);
    },
    subscribe: (Y) => (h.push(Y), {
      unsubscribe: () => {
        h = h.filter((z) => z !== Y);
      }
    }),
    unsubscribe: () => {
      h = [];
    }
  };
}, oy = (h) => sa(h) || !tR(h);
function Eo(h, T) {
  if (oy(h) || oy(T))
    return h === T;
  if (Mf(h) && Mf(T))
    return h.getTime() === T.getTime();
  const y = Object.keys(h), A = Object.keys(T);
  if (y.length !== A.length)
    return !1;
  for (const Y of y) {
    const z = h[Y];
    if (!A.includes(Y))
      return !1;
    if (Y !== "ref") {
      const S = T[Y];
      if (Mf(z) && Mf(S) || Qn(z) && Qn(S) || Array.isArray(z) && Array.isArray(S) ? !Eo(z, S) : z !== S)
        return !1;
    }
  }
  return !0;
}
var iR = (h) => h.type === "select-multiple", Mk = (h) => Z0(h) || Gp(h), Y0 = (h) => ly(h) && h.isConnected, lR = (h) => {
  for (const T in h)
    if (ou(h[T]))
      return !0;
  return !1;
};
function sy(h, T = {}) {
  const y = Array.isArray(h);
  if (Qn(h) || y)
    for (const A in h)
      Array.isArray(h[A]) || Qn(h[A]) && !lR(h[A]) ? (T[A] = Array.isArray(h[A]) ? [] : {}, sy(h[A], T[A])) : sa(h[A]) || (T[A] = !0);
  return T;
}
function uR(h, T, y) {
  const A = Array.isArray(h);
  if (Qn(h) || A)
    for (const Y in h)
      Array.isArray(h[Y]) || Qn(h[Y]) && !lR(h[Y]) ? Nn(T) || oy(y[Y]) ? y[Y] = Array.isArray(h[Y]) ? sy(h[Y], []) : { ...sy(h[Y]) } : uR(h[Y], sa(T) ? {} : T[Y], y[Y]) : y[Y] = !Eo(h[Y], T[Y]);
  return y;
}
var ry = (h, T) => uR(h, T, sy(T)), oR = (h, { valueAsNumber: T, valueAsDate: y, setValueAs: A }) => Nn(h) ? h : T ? h === "" ? NaN : h && +h : y && yl(h) ? new Date(h) : A ? A(h) : h;
function I0(h) {
  const T = h.ref;
  if (!(h.refs ? h.refs.every((y) => y.disabled) : T.disabled))
    return K0(T) ? T.files : Z0(T) ? aR(h.refs).value : iR(T) ? [...T.selectedOptions].map(({ value: y }) => y) : Gp(T) ? rR(h.refs).value : oR(Nn(T.value) ? h.ref.value : T.value, h);
}
var Nk = (h, T, y, A) => {
  const Y = {};
  for (const z of h) {
    const S = be(T, z);
    S && ln(Y, z, S._f);
  }
  return {
    criteriaMode: y,
    names: [...h],
    fields: Y,
    shouldUseNativeValidation: A
  };
}, Qp = (h) => Nn(h) ? h : uy(h) ? h.source : Qn(h) ? uy(h.value) ? h.value.source : h.value : h;
const XT = "AsyncFunction";
var Uk = (h) => (!h || !h.validate) && !!(ou(h.validate) && h.validate.constructor.name === XT || Qn(h.validate) && Object.values(h.validate).find((T) => T.constructor.name === XT)), zk = (h) => h.mount && (h.required || h.min || h.max || h.maxLength || h.minLength || h.pattern || h.validate);
function KT(h, T, y) {
  const A = be(h, y);
  if (A || X0(y))
    return {
      error: A,
      name: y
    };
  const Y = y.split(".");
  for (; Y.length; ) {
    const z = Y.join("."), S = be(T, z), pe = be(h, z);
    if (S && !Array.isArray(S) && y !== z)
      return { name: y };
    if (pe && pe.type)
      return {
        name: z,
        error: pe
      };
    Y.pop();
  }
  return {
    name: y
  };
}
var Ak = (h, T, y, A, Y) => Y.isOnAll ? !1 : !y && Y.isOnTouch ? !(T || h) : (y ? A.isOnBlur : Y.isOnBlur) ? !h : (y ? A.isOnChange : Y.isOnChange) ? h : !0, Fk = (h, T) => !cy(be(h, T)).length && ur(h, T);
const Hk = {
  mode: Vi.onSubmit,
  reValidateMode: Vi.onChange,
  shouldFocusError: !0
};
function Vk(h = {}) {
  let T = {
    ...Hk,
    ...h
  }, y = {
    submitCount: 0,
    isDirty: !1,
    isLoading: ou(T.defaultValues),
    isValidating: !1,
    isSubmitted: !1,
    isSubmitting: !1,
    isSubmitSuccessful: !1,
    isValid: !1,
    touchedFields: {},
    dirtyFields: {},
    validatingFields: {},
    errors: T.errors || {},
    disabled: T.disabled || !1
  }, A = {}, Y = Qn(T.defaultValues) || Qn(T.values) ? fi(T.defaultValues || T.values) || {} : {}, z = T.shouldUnregister ? {} : fi(Y), S = {
    action: !1,
    mount: !1,
    watch: !1
  }, pe = {
    mount: /* @__PURE__ */ new Set(),
    unMount: /* @__PURE__ */ new Set(),
    array: /* @__PURE__ */ new Set(),
    watch: /* @__PURE__ */ new Set()
  }, se, ce = 0;
  const Me = {
    isDirty: !1,
    dirtyFields: !1,
    validatingFields: !1,
    touchedFields: !1,
    isValidating: !1,
    isValid: !1,
    errors: !1
  }, $ = {
    values: $0(),
    array: $0(),
    state: $0()
  }, ue = $T(T.mode), re = $T(T.reValidateMode), xe = T.criteriaMode === Vi.all, Ze = (x) => (M) => {
    clearTimeout(ce), ce = setTimeout(x, M);
  }, Ge = async (x) => {
    if (Me.isValid || x) {
      const M = T.resolver ? Aa((await Yt()).errors) : await pt(A, !0);
      M !== y.isValid && $.state.next({
        isValid: M
      });
    }
  }, wt = (x, M) => {
    (Me.isValidating || Me.validatingFields) && ((x || Array.from(pe.mount)).forEach((V) => {
      V && (M ? ln(y.validatingFields, V, M) : ur(y.validatingFields, V));
    }), $.state.next({
      validatingFields: y.validatingFields,
      isValidating: !Aa(y.validatingFields)
    }));
  }, Ee = (x, M = [], V, te, Z = !0, q = !0) => {
    if (te && V) {
      if (S.action = !0, q && Array.isArray(be(A, x))) {
        const Se = V(be(A, x), te.argA, te.argB);
        Z && ln(A, x, Se);
      }
      if (q && Array.isArray(be(y.errors, x))) {
        const Se = V(be(y.errors, x), te.argA, te.argB);
        Z && ln(y.errors, x, Se), Fk(y.errors, x);
      }
      if (Me.touchedFields && q && Array.isArray(be(y.touchedFields, x))) {
        const Se = V(be(y.touchedFields, x), te.argA, te.argB);
        Z && ln(y.touchedFields, x, Se);
      }
      Me.dirtyFields && (y.dirtyFields = ry(Y, z)), $.state.next({
        name: x,
        isDirty: Ve(x, M),
        dirtyFields: y.dirtyFields,
        errors: y.errors,
        isValid: y.isValid
      });
    } else
      ln(z, x, M);
  }, Ie = (x, M) => {
    ln(y.errors, x, M), $.state.next({
      errors: y.errors
    });
  }, ot = (x) => {
    y.errors = x, $.state.next({
      errors: y.errors,
      isValid: !1
    });
  }, Ne = (x, M, V, te) => {
    const Z = be(A, x);
    if (Z) {
      const q = be(z, x, Nn(V) ? be(Y, x) : V);
      Nn(q) || te && te.defaultChecked || M ? ln(z, x, M ? q : I0(Z._f)) : vt(x, q), S.mount && Ge();
    }
  }, Ct = (x, M, V, te, Z) => {
    let q = !1, Se = !1;
    const Je = {
      name: x
    }, _t = !!(be(A, x) && be(A, x)._f && be(A, x)._f.disabled);
    if (!V || te) {
      Me.isDirty && (Se = y.isDirty, y.isDirty = Je.isDirty = Ve(), q = Se !== Je.isDirty);
      const at = _t || Eo(be(Y, x), M);
      Se = !!(!_t && be(y.dirtyFields, x)), at || _t ? ur(y.dirtyFields, x) : ln(y.dirtyFields, x, !0), Je.dirtyFields = y.dirtyFields, q = q || Me.dirtyFields && Se !== !at;
    }
    if (V) {
      const at = be(y.touchedFields, x);
      at || (ln(y.touchedFields, x, V), Je.touchedFields = y.touchedFields, q = q || Me.touchedFields && at !== V);
    }
    return q && Z && $.state.next(Je), q ? Je : {};
  }, Xe = (x, M, V, te) => {
    const Z = be(y.errors, x), q = Me.isValid && ml(M) && y.isValid !== M;
    if (h.delayError && V ? (se = Ze(() => Ie(x, V)), se(h.delayError)) : (clearTimeout(ce), se = null, V ? ln(y.errors, x, V) : ur(y.errors, x)), (V ? !Eo(Z, V) : Z) || !Aa(te) || q) {
      const Se = {
        ...te,
        ...q && ml(M) ? { isValid: M } : {},
        errors: y.errors,
        name: x
      };
      y = {
        ...y,
        ...Se
      }, $.state.next(Se);
    }
  }, Yt = async (x) => {
    wt(x, !0);
    const M = await T.resolver(z, T.context, Nk(x || pe.mount, A, T.criteriaMode, T.shouldUseNativeValidation));
    return wt(x), M;
  }, Jt = async (x) => {
    const { errors: M } = await Yt(x);
    if (x)
      for (const V of x) {
        const te = be(M, V);
        te ? ln(y.errors, V, te) : ur(y.errors, V);
      }
    else
      y.errors = M;
    return M;
  }, pt = async (x, M, V = {
    valid: !0
  }) => {
    for (const te in x) {
      const Z = x[te];
      if (Z) {
        const { _f: q, ...Se } = Z;
        if (q) {
          const Je = pe.array.has(q.name), _t = Z._f && Uk(Z._f);
          _t && Me.validatingFields && wt([te], !0);
          const at = await qT(Z, z, xe, T.shouldUseNativeValidation && !M, Je);
          if (_t && Me.validatingFields && wt([te]), at[q.name] && (V.valid = !1, M))
            break;
          !M && (be(at, q.name) ? Je ? kk(y.errors, at, q.name) : ln(y.errors, q.name, at[q.name]) : ur(y.errors, q.name));
        }
        !Aa(Se) && await pt(Se, M, V);
      }
    }
    return V.valid;
  }, Et = () => {
    for (const x of pe.unMount) {
      const M = be(A, x);
      M && (M._f.refs ? M._f.refs.every((V) => !Y0(V)) : !Y0(M._f.ref)) && en(x);
    }
    pe.unMount = /* @__PURE__ */ new Set();
  }, Ve = (x, M) => (x && M && ln(z, x, M), !Eo(ht(), Y)), oe = (x, M, V) => Dk(x, pe, {
    ...S.mount ? z : Nn(M) ? Y : yl(x) ? { [x]: M } : M
  }, V, M), Fe = (x) => cy(be(S.mount ? z : Y, x, h.shouldUnregister ? be(Y, x, []) : [])), vt = (x, M, V = {}) => {
    const te = be(A, x);
    let Z = M;
    if (te) {
      const q = te._f;
      q && (!q.disabled && ln(z, x, oR(M, q)), Z = ly(q.ref) && sa(M) ? "" : M, iR(q.ref) ? [...q.ref.options].forEach((Se) => Se.selected = Z.includes(Se.value)) : q.refs ? Gp(q.ref) ? q.refs.length > 1 ? q.refs.forEach((Se) => (!Se.defaultChecked || !Se.disabled) && (Se.checked = Array.isArray(Z) ? !!Z.find((Je) => Je === Se.value) : Z === Se.value)) : q.refs[0] && (q.refs[0].checked = !!Z) : q.refs.forEach((Se) => Se.checked = Se.value === Z) : K0(q.ref) ? q.ref.value = "" : (q.ref.value = Z, q.ref.type || $.values.next({
        name: x,
        values: { ...z }
      })));
    }
    (V.shouldDirty || V.shouldTouch) && Ct(x, Z, V.shouldTouch, V.shouldDirty, !0), V.shouldValidate && fe(x);
  }, st = (x, M, V) => {
    for (const te in M) {
      const Z = M[te], q = `${x}.${te}`, Se = be(A, q);
      (pe.array.has(x) || !oy(Z) || Se && !Se._f) && !Mf(Z) ? st(q, Z, V) : vt(q, Z, V);
    }
  }, Ut = (x, M, V = {}) => {
    const te = be(A, x), Z = pe.array.has(x), q = fi(M);
    ln(z, x, q), Z ? ($.array.next({
      name: x,
      values: { ...z }
    }), (Me.isDirty || Me.dirtyFields) && V.shouldDirty && $.state.next({
      name: x,
      dirtyFields: ry(Y, z),
      isDirty: Ve(x, q)
    })) : te && !te._f && !sa(q) ? st(x, q, V) : vt(x, q, V), YT(x, pe) && $.state.next({ ...y }), $.values.next({
      name: S.mount ? x : void 0,
      values: { ...z }
    });
  }, ee = async (x) => {
    S.mount = !0;
    const M = x.target;
    let V = M.name, te = !0;
    const Z = be(A, V), q = () => M.type ? I0(Z._f) : Ek(x), Se = (Je) => {
      te = Number.isNaN(Je) || Eo(Je, be(z, V, Je));
    };
    if (Z) {
      let Je, _t;
      const at = q(), dn = x.type === PT.BLUR || x.type === PT.FOCUS_OUT, Ga = !zk(Z._f) && !T.resolver && !be(y.errors, V) && !Z._f.deps || Ak(dn, be(y.touchedFields, V), y.isSubmitted, re, ue), yr = YT(V, pe, dn);
      ln(z, V, at), dn ? (Z._f.onBlur && Z._f.onBlur(x), se && se(0)) : Z._f.onChange && Z._f.onChange(x);
      const ne = Ct(V, at, dn, !1), Ue = !Aa(ne) || yr;
      if (!dn && $.values.next({
        name: V,
        type: x.type,
        values: { ...z }
      }), Ga)
        return Me.isValid && (h.mode === "onBlur" ? dn && Ge() : Ge()), Ue && $.state.next({ name: V, ...yr ? {} : ne });
      if (!dn && yr && $.state.next({ ...y }), T.resolver) {
        const { errors: rt } = await Yt([V]);
        if (Se(at), te) {
          const bt = KT(y.errors, A, V), jt = KT(rt, A, bt.name || V);
          Je = jt.error, V = jt.name, _t = Aa(rt);
        }
      } else
        wt([V], !0), Je = (await qT(Z, z, xe, T.shouldUseNativeValidation))[V], wt([V]), Se(at), te && (Je ? _t = !1 : Me.isValid && (_t = await pt(A, !0)));
      te && (Z._f.deps && fe(Z._f.deps), Xe(V, _t, Je, ne));
    }
  }, ke = (x, M) => {
    if (be(y.errors, M) && x.focus)
      return x.focus(), 1;
  }, fe = async (x, M = {}) => {
    let V, te;
    const Z = ay(x);
    if (T.resolver) {
      const q = await Jt(Nn(x) ? x : Z);
      V = Aa(q), te = x ? !Z.some((Se) => be(q, Se)) : V;
    } else x ? (te = (await Promise.all(Z.map(async (q) => {
      const Se = be(A, q);
      return await pt(Se && Se._f ? { [q]: Se } : Se);
    }))).every(Boolean), !(!te && !y.isValid) && Ge()) : te = V = await pt(A);
    return $.state.next({
      ...!yl(x) || Me.isValid && V !== y.isValid ? {} : { name: x },
      ...T.resolver || !x ? { isValid: V } : {},
      errors: y.errors
    }), M.shouldFocus && !te && Wp(A, ke, x ? Z : pe.mount), te;
  }, ht = (x) => {
    const M = {
      ...S.mount ? z : Y
    };
    return Nn(x) ? M : yl(x) ? be(M, x) : x.map((V) => be(M, V));
  }, gt = (x, M) => ({
    invalid: !!be((M || y).errors, x),
    isDirty: !!be((M || y).dirtyFields, x),
    error: be((M || y).errors, x),
    isValidating: !!be(y.validatingFields, x),
    isTouched: !!be((M || y).touchedFields, x)
  }), xn = (x) => {
    x && ay(x).forEach((M) => ur(y.errors, M)), $.state.next({
      errors: x ? y.errors : {}
    });
  }, Un = (x, M, V) => {
    const te = (be(A, x, { _f: {} })._f || {}).ref, Z = be(y.errors, x) || {}, { ref: q, message: Se, type: Je, ..._t } = Z;
    ln(y.errors, x, {
      ..._t,
      ...M,
      ref: te
    }), $.state.next({
      name: x,
      errors: y.errors,
      isValid: !1
    }), V && V.shouldFocus && te && te.focus && te.focus();
  }, ca = (x, M) => ou(x) ? $.values.subscribe({
    next: (V) => x(oe(void 0, M), V)
  }) : oe(x, M, !0), en = (x, M = {}) => {
    for (const V of x ? ay(x) : pe.mount)
      pe.mount.delete(V), pe.array.delete(V), M.keepValue || (ur(A, V), ur(z, V)), !M.keepError && ur(y.errors, V), !M.keepDirty && ur(y.dirtyFields, V), !M.keepTouched && ur(y.touchedFields, V), !M.keepIsValidating && ur(y.validatingFields, V), !T.shouldUnregister && !M.keepDefaultValue && ur(Y, V);
    $.values.next({
      values: { ...z }
    }), $.state.next({
      ...y,
      ...M.keepDirty ? { isDirty: Ve() } : {}
    }), !M.keepIsValid && Ge();
  }, mr = ({ disabled: x, name: M, field: V, fields: te, value: Z }) => {
    if (ml(x) && S.mount || x) {
      const q = x ? void 0 : Nn(Z) ? I0(V ? V._f : be(te, M)._f) : Z;
      ln(z, M, q), Ct(M, q, !1, !1, !0);
    }
  }, gn = (x, M = {}) => {
    let V = be(A, x);
    const te = ml(M.disabled) || ml(h.disabled);
    return ln(A, x, {
      ...V || {},
      _f: {
        ...V && V._f ? V._f : { ref: { name: x } },
        name: x,
        mount: !0,
        ...M
      }
    }), pe.mount.add(x), V ? mr({
      field: V,
      disabled: ml(M.disabled) ? M.disabled : h.disabled,
      name: x,
      value: M.value
    }) : Ne(x, !0, M.value), {
      ...te ? { disabled: M.disabled || h.disabled } : {},
      ...T.progressive ? {
        required: !!M.required,
        min: Qp(M.min),
        max: Qp(M.max),
        minLength: Qp(M.minLength),
        maxLength: Qp(M.maxLength),
        pattern: Qp(M.pattern)
      } : {},
      name: x,
      onChange: ee,
      onBlur: ee,
      ref: (Z) => {
        if (Z) {
          gn(x, M), V = be(A, x);
          const q = Nn(Z.value) && Z.querySelectorAll && Z.querySelectorAll("input,select,textarea")[0] || Z, Se = Mk(q), Je = V._f.refs || [];
          if (Se ? Je.find((_t) => _t === q) : q === V._f.ref)
            return;
          ln(A, x, {
            _f: {
              ...V._f,
              ...Se ? {
                refs: [
                  ...Je.filter(Y0),
                  q,
                  ...Array.isArray(be(Y, x)) ? [{}] : []
                ],
                ref: { type: q.type, name: x }
              } : { ref: q }
            }
          }), Ne(x, !1, void 0, q);
        } else
          V = be(A, x, {}), V._f && (V._f.mount = !1), (T.shouldUnregister || M.shouldUnregister) && !(Tk(pe.array, x) && S.action) && pe.unMount.add(x);
      }
    };
  }, Wn = () => T.shouldFocusError && Wp(A, ke, pe.mount), fa = (x) => {
    ml(x) && ($.state.next({ disabled: x }), Wp(A, (M, V) => {
      const te = be(A, V);
      te && (M.disabled = te._f.disabled || x, Array.isArray(te._f.refs) && te._f.refs.forEach((Z) => {
        Z.disabled = te._f.disabled || x;
      }));
    }, 0, !1));
  }, Gn = (x, M) => async (V) => {
    let te;
    V && (V.preventDefault && V.preventDefault(), V.persist && V.persist());
    let Z = fi(z);
    if ($.state.next({
      isSubmitting: !0
    }), T.resolver) {
      const { errors: q, values: Se } = await Yt();
      y.errors = q, Z = Se;
    } else
      await pt(A);
    if (ur(y.errors, "root"), Aa(y.errors)) {
      $.state.next({
        errors: {}
      });
      try {
        await x(Z, V);
      } catch (q) {
        te = q;
      }
    } else
      M && await M({ ...y.errors }, V), Wn(), setTimeout(Wn);
    if ($.state.next({
      isSubmitted: !0,
      isSubmitting: !1,
      isSubmitSuccessful: Aa(y.errors) && !te,
      submitCount: y.submitCount + 1,
      errors: y.errors
    }), te)
      throw te;
  }, _r = (x, M = {}) => {
    be(A, x) && (Nn(M.defaultValue) ? Ut(x, fi(be(Y, x))) : (Ut(x, M.defaultValue), ln(Y, x, fi(M.defaultValue))), M.keepTouched || ur(y.touchedFields, x), M.keepDirty || (ur(y.dirtyFields, x), y.isDirty = M.defaultValue ? Ve(x, fi(be(Y, x))) : Ve()), M.keepError || (ur(y.errors, x), Me.isValid && Ge()), $.state.next({ ...y }));
  }, fn = (x, M = {}) => {
    const V = x ? fi(x) : Y, te = fi(V), Z = Aa(x), q = Z ? Y : te;
    if (M.keepDefaultValues || (Y = V), !M.keepValues) {
      if (M.keepDirtyValues)
        for (const Se of pe.mount)
          be(y.dirtyFields, Se) ? ln(q, Se, be(z, Se)) : Ut(Se, be(q, Se));
      else {
        if (q0 && Nn(x))
          for (const Se of pe.mount) {
            const Je = be(A, Se);
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
        A = {};
      }
      z = h.shouldUnregister ? M.keepDefaultValues ? fi(Y) : {} : fi(q), $.array.next({
        values: { ...q }
      }), $.values.next({
        values: { ...q }
      });
    }
    pe = {
      mount: M.keepDirtyValues ? pe.mount : /* @__PURE__ */ new Set(),
      unMount: /* @__PURE__ */ new Set(),
      array: /* @__PURE__ */ new Set(),
      watch: /* @__PURE__ */ new Set(),
      watchAll: !1,
      focus: ""
    }, S.mount = !Me.isValid || !!M.keepIsValid || !!M.keepDirtyValues, S.watch = !!h.shouldUnregister, $.state.next({
      submitCount: M.keepSubmitCount ? y.submitCount : 0,
      isDirty: Z ? !1 : M.keepDirty ? y.isDirty : !!(M.keepDefaultValues && !Eo(x, Y)),
      isSubmitted: M.keepIsSubmitted ? y.isSubmitted : !1,
      dirtyFields: Z ? {} : M.keepDirtyValues ? M.keepDefaultValues && z ? ry(Y, z) : y.dirtyFields : M.keepDefaultValues && x ? ry(Y, x) : M.keepDirty ? y.dirtyFields : {},
      touchedFields: M.keepTouched ? y.touchedFields : {},
      errors: M.keepErrors ? y.errors : {},
      isSubmitSuccessful: M.keepIsSubmitSuccessful ? y.isSubmitSuccessful : !1,
      isSubmitting: !1
    });
  }, wn = (x, M) => fn(ou(x) ? x(z) : x, M);
  return {
    control: {
      register: gn,
      unregister: en,
      getFieldState: gt,
      handleSubmit: Gn,
      setError: Un,
      _executeSchema: Yt,
      _getWatch: oe,
      _getDirty: Ve,
      _updateValid: Ge,
      _removeUnmounted: Et,
      _updateFieldArray: Ee,
      _updateDisabledField: mr,
      _getFieldArray: Fe,
      _reset: fn,
      _resetDefaultValues: () => ou(T.defaultValues) && T.defaultValues().then((x) => {
        wn(x, T.resetOptions), $.state.next({
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
      _subjects: $,
      _proxyFormState: Me,
      _setErrors: ot,
      get _fields() {
        return A;
      },
      get _formValues() {
        return z;
      },
      get _state() {
        return S;
      },
      set _state(x) {
        S = x;
      },
      get _defaultValues() {
        return Y;
      },
      get _names() {
        return pe;
      },
      set _names(x) {
        pe = x;
      },
      get _formState() {
        return y;
      },
      set _formState(x) {
        y = x;
      },
      get _options() {
        return T;
      },
      set _options(x) {
        T = {
          ...T,
          ...x
        };
      }
    },
    trigger: fe,
    register: gn,
    handleSubmit: Gn,
    watch: ca,
    setValue: Ut,
    getValues: ht,
    reset: wn,
    resetField: _r,
    clearErrors: xn,
    unregister: en,
    setError: Un,
    setFocus: (x, M = {}) => {
      const V = be(A, x), te = V && V._f;
      if (te) {
        const Z = te.refs ? te.refs[0] : te.ref;
        Z.focus && (Z.focus(), M.shouldSelect && Z.select());
      }
    },
    getFieldState: gt
  };
}
function jk(h = {}) {
  const T = hr.useRef(), y = hr.useRef(), [A, Y] = hr.useState({
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
  T.current || (T.current = {
    ...Vk(h),
    formState: A
  });
  const z = T.current.control;
  return z._options = h, bk({
    subject: z._subjects.state,
    next: (S) => {
      wk(S, z._proxyFormState, z._updateFormState) && Y({ ...z._formState });
    }
  }), hr.useEffect(() => z._disableForm(h.disabled), [z, h.disabled]), hr.useEffect(() => {
    if (z._proxyFormState.isDirty) {
      const S = z._getDirty();
      S !== A.isDirty && z._subjects.state.next({
        isDirty: S
      });
    }
  }, [z, A.isDirty]), hr.useEffect(() => {
    h.values && !Eo(h.values, y.current) ? (z._reset(h.values, z._options.resetOptions), y.current = h.values, Y((S) => ({ ...S }))) : z._resetDefaultValues();
  }, [h.values, z]), hr.useEffect(() => {
    h.errors && z._setErrors(h.errors);
  }, [h.errors, z]), hr.useEffect(() => {
    z._state.mount || (z._updateValid(), z._state.mount = !0), z._state.watch && (z._state.watch = !1, z._subjects.state.next({ ...z._formState })), z._removeUnmounted();
  }), hr.useEffect(() => {
    h.shouldUnregister && z._subjects.values.next({
      values: z._getWatch()
    });
  }, [h.shouldUnregister, z]), T.current.formState = xk(A, z), T.current;
}
const Bk = () => {
  const {
    register: h,
    handleSubmit: T,
    formState: { errors: y }
  } = jk(), A = (Y) => {
    console.log("Submit data:", Y);
  };
  return /* @__PURE__ */ oa.jsxs("form", { onSubmit: T(A), children: [
    /* @__PURE__ */ oa.jsxs("div", { children: [
      /* @__PURE__ */ oa.jsx("label", { htmlFor: "name", children: "Nombre:" }),
      /* @__PURE__ */ oa.jsx(
        "input",
        {
          id: "name",
          type: "text",
          ...h("name", { required: "Este campo es requerido" })
        }
      ),
      y.name && /* @__PURE__ */ oa.jsx("span", { children: y.name.message })
    ] }),
    /* @__PURE__ */ oa.jsxs("div", { children: [
      /* @__PURE__ */ oa.jsx("label", { htmlFor: "email", children: "Correo Electrónico:" }),
      /* @__PURE__ */ oa.jsx(
        "input",
        {
          id: "email",
          type: "email",
          ...h("email", {
            required: "Este campo es requerido",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Formato de correo electrónico no válido"
            }
          })
        }
      ),
      y.email && /* @__PURE__ */ oa.jsx("span", { children: y.email.message })
    ] }),
    /* @__PURE__ */ oa.jsx("button", { type: "submit", children: "Enviar" })
  ] });
};
customElements.define(
  "rwc-header",
  eR(Sk, {
    props: { text: "string", image: "string" }
  })
);
customElements.define(
  "rwc-form",
  eR(Bk, {
    props: { onSubmit: "function" }
  })
);
export {
  Bk as Form,
  Sk as Header
};
