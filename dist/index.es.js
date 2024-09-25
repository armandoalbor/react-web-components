import Pe from "react";
var ee = { exports: {} }, F = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Se;
function vr() {
  if (Se) return F;
  Se = 1;
  var C = Pe, P = Symbol.for("react.element"), U = Symbol.for("react.fragment"), m = Object.prototype.hasOwnProperty, W = C.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, $ = { key: !0, ref: !0, __self: !0, __source: !0 };
  function j(y, c, T) {
    var p, _ = {}, b = null, Y = null;
    T !== void 0 && (b = "" + T), c.key !== void 0 && (b = "" + c.key), c.ref !== void 0 && (Y = c.ref);
    for (p in c) m.call(c, p) && !$.hasOwnProperty(p) && (_[p] = c[p]);
    if (y && y.defaultProps) for (p in c = y.defaultProps, c) _[p] === void 0 && (_[p] = c[p]);
    return { $$typeof: P, type: y, key: b, ref: Y, props: _, _owner: W.current };
  }
  return F.Fragment = U, F.jsx = j, F.jsxs = j, F;
}
var A = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ce;
function dr() {
  return Ce || (Ce = 1, process.env.NODE_ENV !== "production" && function() {
    var C = Pe, P = Symbol.for("react.element"), U = Symbol.for("react.portal"), m = Symbol.for("react.fragment"), W = Symbol.for("react.strict_mode"), $ = Symbol.for("react.profiler"), j = Symbol.for("react.provider"), y = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), T = Symbol.for("react.suspense"), p = Symbol.for("react.suspense_list"), _ = Symbol.for("react.memo"), b = Symbol.for("react.lazy"), Y = Symbol.for("react.offscreen"), re = Symbol.iterator, je = "@@iterator";
    function xe(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = re && e[re] || e[je];
      return typeof r == "function" ? r : null;
    }
    var w = C.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function f(e) {
      {
        for (var r = arguments.length, t = new Array(r > 1 ? r - 1 : 0), n = 1; n < r; n++)
          t[n - 1] = arguments[n];
        ke("error", e, t);
      }
    }
    function ke(e, r, t) {
      {
        var n = w.ReactDebugCurrentFrame, i = n.getStackAddendum();
        i !== "" && (r += "%s", t = t.concat([i]));
        var u = t.map(function(o) {
          return String(o);
        });
        u.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, u);
      }
    }
    var De = !1, Fe = !1, Ae = !1, Ie = !1, We = !1, te;
    te = Symbol.for("react.module.reference");
    function $e(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === m || e === $ || We || e === W || e === T || e === p || Ie || e === Y || De || Fe || Ae || typeof e == "object" && e !== null && (e.$$typeof === b || e.$$typeof === _ || e.$$typeof === j || e.$$typeof === y || e.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === te || e.getModuleId !== void 0));
    }
    function Ye(e, r, t) {
      var n = e.displayName;
      if (n)
        return n;
      var i = r.displayName || r.name || "";
      return i !== "" ? t + "(" + i + ")" : t;
    }
    function ne(e) {
      return e.displayName || "Context";
    }
    function h(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && f("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case m:
          return "Fragment";
        case U:
          return "Portal";
        case $:
          return "Profiler";
        case W:
          return "StrictMode";
        case T:
          return "Suspense";
        case p:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case y:
            var r = e;
            return ne(r) + ".Consumer";
          case j:
            var t = e;
            return ne(t._context) + ".Provider";
          case c:
            return Ye(e, e.render, "ForwardRef");
          case _:
            var n = e.displayName || null;
            return n !== null ? n : h(e.type) || "Memo";
          case b: {
            var i = e, u = i._payload, o = i._init;
            try {
              return h(o(u));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var E = Object.assign, x = 0, ae, oe, ie, ue, se, le, fe;
    function ce() {
    }
    ce.__reactDisabledLog = !0;
    function Le() {
      {
        if (x === 0) {
          ae = console.log, oe = console.info, ie = console.warn, ue = console.error, se = console.group, le = console.groupCollapsed, fe = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: ce,
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
        x++;
      }
    }
    function Ve() {
      {
        if (x--, x === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: E({}, e, {
              value: ae
            }),
            info: E({}, e, {
              value: oe
            }),
            warn: E({}, e, {
              value: ie
            }),
            error: E({}, e, {
              value: ue
            }),
            group: E({}, e, {
              value: se
            }),
            groupCollapsed: E({}, e, {
              value: le
            }),
            groupEnd: E({}, e, {
              value: fe
            })
          });
        }
        x < 0 && f("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var q = w.ReactCurrentDispatcher, B;
    function L(e, r, t) {
      {
        if (B === void 0)
          try {
            throw Error();
          } catch (i) {
            var n = i.stack.trim().match(/\n( *(at )?)/);
            B = n && n[1] || "";
          }
        return `
` + B + e;
      }
    }
    var J = !1, V;
    {
      var Me = typeof WeakMap == "function" ? WeakMap : Map;
      V = new Me();
    }
    function ve(e, r) {
      if (!e || J)
        return "";
      {
        var t = V.get(e);
        if (t !== void 0)
          return t;
      }
      var n;
      J = !0;
      var i = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var u;
      u = q.current, q.current = null, Le();
      try {
        if (r) {
          var o = function() {
            throw Error();
          };
          if (Object.defineProperty(o.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(o, []);
            } catch (d) {
              n = d;
            }
            Reflect.construct(e, [], o);
          } else {
            try {
              o.call();
            } catch (d) {
              n = d;
            }
            e.call(o.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (d) {
            n = d;
          }
          e();
        }
      } catch (d) {
        if (d && n && typeof d.stack == "string") {
          for (var a = d.stack.split(`
`), v = n.stack.split(`
`), s = a.length - 1, l = v.length - 1; s >= 1 && l >= 0 && a[s] !== v[l]; )
            l--;
          for (; s >= 1 && l >= 0; s--, l--)
            if (a[s] !== v[l]) {
              if (s !== 1 || l !== 1)
                do
                  if (s--, l--, l < 0 || a[s] !== v[l]) {
                    var g = `
` + a[s].replace(" at new ", " at ");
                    return e.displayName && g.includes("<anonymous>") && (g = g.replace("<anonymous>", e.displayName)), typeof e == "function" && V.set(e, g), g;
                  }
                while (s >= 1 && l >= 0);
              break;
            }
        }
      } finally {
        J = !1, q.current = u, Ve(), Error.prepareStackTrace = i;
      }
      var S = e ? e.displayName || e.name : "", R = S ? L(S) : "";
      return typeof e == "function" && V.set(e, R), R;
    }
    function Ne(e, r, t) {
      return ve(e, !1);
    }
    function Ue(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function M(e, r, t) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return ve(e, Ue(e));
      if (typeof e == "string")
        return L(e);
      switch (e) {
        case T:
          return L("Suspense");
        case p:
          return L("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case c:
            return Ne(e.render);
          case _:
            return M(e.type, r, t);
          case b: {
            var n = e, i = n._payload, u = n._init;
            try {
              return M(u(i), r, t);
            } catch {
            }
          }
        }
      return "";
    }
    var k = Object.prototype.hasOwnProperty, de = {}, pe = w.ReactDebugCurrentFrame;
    function N(e) {
      if (e) {
        var r = e._owner, t = M(e.type, e._source, r ? r.type : null);
        pe.setExtraStackFrame(t);
      } else
        pe.setExtraStackFrame(null);
    }
    function qe(e, r, t, n, i) {
      {
        var u = Function.call.bind(k);
        for (var o in e)
          if (u(e, o)) {
            var a = void 0;
            try {
              if (typeof e[o] != "function") {
                var v = Error((n || "React class") + ": " + t + " type `" + o + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[o] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw v.name = "Invariant Violation", v;
              }
              a = e[o](r, o, n, t, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (s) {
              a = s;
            }
            a && !(a instanceof Error) && (N(i), f("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", n || "React class", t, o, typeof a), N(null)), a instanceof Error && !(a.message in de) && (de[a.message] = !0, N(i), f("Failed %s type: %s", t, a.message), N(null));
          }
      }
    }
    var Be = Array.isArray;
    function z(e) {
      return Be(e);
    }
    function Je(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, t = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return t;
      }
    }
    function ze(e) {
      try {
        return ge(e), !1;
      } catch {
        return !0;
      }
    }
    function ge(e) {
      return "" + e;
    }
    function he(e) {
      if (ze(e))
        return f("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Je(e)), ge(e);
    }
    var D = w.ReactCurrentOwner, Ke = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, _e, ye, K;
    K = {};
    function Ge(e) {
      if (k.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function Xe(e) {
      if (k.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function He(e, r) {
      if (typeof e.ref == "string" && D.current && r && D.current.stateNode !== r) {
        var t = h(D.current.type);
        K[t] || (f('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', h(D.current.type), e.ref), K[t] = !0);
      }
    }
    function Ze(e, r) {
      {
        var t = function() {
          _e || (_e = !0, f("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: t,
          configurable: !0
        });
      }
    }
    function Qe(e, r) {
      {
        var t = function() {
          ye || (ye = !0, f("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: t,
          configurable: !0
        });
      }
    }
    var er = function(e, r, t, n, i, u, o) {
      var a = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: P,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: t,
        props: o,
        // Record the component responsible for creating this element.
        _owner: u
      };
      return a._store = {}, Object.defineProperty(a._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(a, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: n
      }), Object.defineProperty(a, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: i
      }), Object.freeze && (Object.freeze(a.props), Object.freeze(a)), a;
    };
    function rr(e, r, t, n, i) {
      {
        var u, o = {}, a = null, v = null;
        t !== void 0 && (he(t), a = "" + t), Xe(r) && (he(r.key), a = "" + r.key), Ge(r) && (v = r.ref, He(r, i));
        for (u in r)
          k.call(r, u) && !Ke.hasOwnProperty(u) && (o[u] = r[u]);
        if (e && e.defaultProps) {
          var s = e.defaultProps;
          for (u in s)
            o[u] === void 0 && (o[u] = s[u]);
        }
        if (a || v) {
          var l = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          a && Ze(o, l), v && Qe(o, l);
        }
        return er(e, a, v, i, n, D.current, o);
      }
    }
    var G = w.ReactCurrentOwner, be = w.ReactDebugCurrentFrame;
    function O(e) {
      if (e) {
        var r = e._owner, t = M(e.type, e._source, r ? r.type : null);
        be.setExtraStackFrame(t);
      } else
        be.setExtraStackFrame(null);
    }
    var X;
    X = !1;
    function H(e) {
      return typeof e == "object" && e !== null && e.$$typeof === P;
    }
    function Ee() {
      {
        if (G.current) {
          var e = h(G.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function tr(e) {
      return "";
    }
    var Re = {};
    function nr(e) {
      {
        var r = Ee();
        if (!r) {
          var t = typeof e == "string" ? e : e.displayName || e.name;
          t && (r = `

Check the top-level render call using <` + t + ">.");
        }
        return r;
      }
    }
    function me(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var t = nr(r);
        if (Re[t])
          return;
        Re[t] = !0;
        var n = "";
        e && e._owner && e._owner !== G.current && (n = " It was passed a child from " + h(e._owner.type) + "."), O(e), f('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', t, n), O(null);
      }
    }
    function Te(e, r) {
      {
        if (typeof e != "object")
          return;
        if (z(e))
          for (var t = 0; t < e.length; t++) {
            var n = e[t];
            H(n) && me(n, r);
          }
        else if (H(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var i = xe(e);
          if (typeof i == "function" && i !== e.entries)
            for (var u = i.call(e), o; !(o = u.next()).done; )
              H(o.value) && me(o.value, r);
        }
      }
    }
    function ar(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var t;
        if (typeof r == "function")
          t = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === c || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === _))
          t = r.propTypes;
        else
          return;
        if (t) {
          var n = h(r);
          qe(t, e.props, "prop", n, e);
        } else if (r.PropTypes !== void 0 && !X) {
          X = !0;
          var i = h(r);
          f("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", i || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && f("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function or(e) {
      {
        for (var r = Object.keys(e.props), t = 0; t < r.length; t++) {
          var n = r[t];
          if (n !== "children" && n !== "key") {
            O(e), f("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", n), O(null);
            break;
          }
        }
        e.ref !== null && (O(e), f("Invalid attribute `ref` supplied to `React.Fragment`."), O(null));
      }
    }
    var we = {};
    function Oe(e, r, t, n, i, u) {
      {
        var o = $e(e);
        if (!o) {
          var a = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (a += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var v = tr();
          v ? a += v : a += Ee();
          var s;
          e === null ? s = "null" : z(e) ? s = "array" : e !== void 0 && e.$$typeof === P ? (s = "<" + (h(e.type) || "Unknown") + " />", a = " Did you accidentally export a JSX literal instead of a component?") : s = typeof e, f("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", s, a);
        }
        var l = rr(e, r, t, i, u);
        if (l == null)
          return l;
        if (o) {
          var g = r.children;
          if (g !== void 0)
            if (n)
              if (z(g)) {
                for (var S = 0; S < g.length; S++)
                  Te(g[S], e);
                Object.freeze && Object.freeze(g);
              } else
                f("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Te(g, e);
        }
        if (k.call(r, "key")) {
          var R = h(e), d = Object.keys(r).filter(function(cr) {
            return cr !== "key";
          }), Z = d.length > 0 ? "{key: someKey, " + d.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!we[R + Z]) {
            var fr = d.length > 0 ? "{" + d.join(": ..., ") + ": ...}" : "{}";
            f(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Z, R, fr, R), we[R + Z] = !0;
          }
        }
        return e === m ? or(l) : ar(l), l;
      }
    }
    function ir(e, r, t) {
      return Oe(e, r, t, !0);
    }
    function ur(e, r, t) {
      return Oe(e, r, t, !1);
    }
    var sr = ur, lr = ir;
    A.Fragment = m, A.jsx = sr, A.jsxs = lr;
  }()), A;
}
process.env.NODE_ENV === "production" ? ee.exports = vr() : ee.exports = dr();
var I = ee.exports;
const pr = "_wrapper_zcvvq_1", gr = "_logo_zcvvq_19", hr = "_title_zcvvq_29", Q = {
  wrapper: pr,
  logo: gr,
  title: hr
}, yr = ({ text: C }) => /* @__PURE__ */ I.jsx("header", { children: /* @__PURE__ */ I.jsxs("div", { className: Q.wrapper, children: [
  /* @__PURE__ */ I.jsx("div", { children: /* @__PURE__ */ I.jsx(
    "img",
    {
      className: Q.logo,
      src: "https://new.bitovi.com/logos/bitovi-logo-red-1.svg"
    }
  ) }),
  /* @__PURE__ */ I.jsx("h1", { className: Q.logo, children: C })
] }) });
export {
  yr as Header
};
