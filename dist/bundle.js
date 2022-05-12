(() => {
  'use strict';
  var r = {
      d: (t, e) => {
        for (var n in e)
          r.o(e, n) &&
            !r.o(t, n) &&
            Object.defineProperty(t, n, {
              enumerable: !0,
              get: e[n],
            });
      },
      o: (r, t) => Object.prototype.hasOwnProperty.call(r, t),
      r: (r) => {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(r, Symbol.toStringTag, {
            value: 'Module',
          }),
          Object.defineProperty(r, '__esModule', { value: !0 });
      },
    },
    t = {};
  r.r(t), r.d(t, { test: () => c });
  const e = [
    'log',
    'debug',
    'info',
    'warn',
    'error',
    'table',
    'clear',
    'time',
    'timeEnd',
    'count',
    'assert',
    'command',
    'result',
  ];
  var n,
    a = function () {
      return (
        (a =
          Object.assign ||
          function (r) {
            for (var t, e = 1, n = arguments.length; e < n; e++)
              for (var a in (t = arguments[e]))
                Object.prototype.hasOwnProperty.call(t, a) &&
                  (r[a] = t[a]);
            return r;
          }),
        a.apply(this, arguments)
      );
    },
    o = { timings: {}, count: {} },
    i = function () {
      return 'undefined' != typeof performance && performance.now
        ? performance.now()
        : Date.now();
    };
  const s = function (r) {
    var t;
    (t = (function (r, t) {
      var e, n, s;
      switch ((void 0 === r && (r = o), t.type)) {
        case 'COUNT':
          var u = r.count[t.name] || 0;
          return a(a({}, r), {
            count: a(
              a({}, r.count),
              ((e = {}), (e[t.name] = u + 1), e)
            ),
          });
        case 'TIME_START':
          return a(a({}, r), {
            timings: a(
              a({}, r.timings),
              ((n = {}), (n[t.name] = { start: i() }), n)
            ),
          });
        case 'TIME_END':
          var c = r.timings[t.name],
            f = i(),
            l = f - c.start;
          return a(a({}, r), {
            timings: a(
              a({}, r.timings),
              ((s = {}),
              (s[t.name] = a(a({}, c), { end: f, time: l })),
              s)
            ),
          });
        default:
          return r;
      }
    })(n, r)),
      (n = t);
  };
  var u = function (r, t, e) {
    if (e || 2 === arguments.length)
      for (var n, a = 0, o = t.length; a < o; a++)
        (!n && a in t) ||
          (n || (n = Array.prototype.slice.call(t, 0, a)),
          (n[a] = t[a]));
    return r.concat(n || Array.prototype.slice.call(t));
  };
  function c(r) {
    for (var t = [], e = 1; e < arguments.length; e++)
      t[e - 1] = arguments[e];
    return (
      !r &&
      (0 === t.length && t.push('console.assert'),
      { method: 'error', data: u(['Assertion failed:'], t, !0) })
    );
  }
  var f = function () {
    return (
      (f =
        Object.assign ||
        function (r) {
          for (var t, e = 1, n = arguments.length; e < n; e++)
            for (var a in (t = arguments[e]))
              Object.prototype.hasOwnProperty.call(t, a) &&
                (r[a] = t[a]);
          return r;
        }),
      f.apply(this, arguments)
    );
  };
  const l = function (r, e, a) {
    var o,
      i =
        a ||
        (o = function () {
          return ((65536 * (1 + Math.random())) | 0)
            .toString(16)
            .substring(1);
        })() +
          o() +
          '-' +
          o() +
          '-' +
          o() +
          '-' +
          o() +
          '-' +
          o() +
          '-' +
          Date.now();
    switch (r) {
      case 'clear':
        return { method: r, id: i };
      case 'count':
        return (
          !!(u = 'string' == typeof e[0] ? e[0] : 'default') &&
          f(
            f(
              {},
              (function (r) {
                s({ type: 'COUNT', name: r });
                var t = n.count[r];
                return {
                  method: 'log',
                  data: [''.concat(r, ': ').concat(t)],
                };
              })(u)
            ),
            { id: i }
          )
        );
      case 'time':
      case 'timeEnd':
        var u;
        return (
          !!(u = 'string' == typeof e[0] ? e[0] : 'default') &&
          ('time' === r
            ? ((function (r) {
                s({ type: 'TIME_START', name: r });
              })(u),
              !1)
            : f(
                f(
                  {},
                  (function (r) {
                    var t = null == n ? void 0 : n.timings[r];
                    if (t && !t.end) {
                      s({ type: 'TIME_END', name: r });
                      var e = n.timings[r].time;
                      return {
                        method: 'log',
                        data: [''.concat(r, ': ').concat(e, 'ms')],
                      };
                    }
                    return {
                      method: 'warn',
                      data: ["Timer '".concat(r, "' does not exist")],
                    };
                  })(u)
                ),
                { id: i }
              ))
        );
      case 'assert':
        if (0 !== e.length) {
          var l = c.apply(
            t,
            (function (r, t, e) {
              if (e || 2 === arguments.length)
                for (var n, a = 0, o = t.length; a < o; a++)
                  (!n && a in t) ||
                    (n || (n = Array.prototype.slice.call(t, 0, a)),
                    (n[a] = t[a]));
              return r.concat(n || Array.prototype.slice.call(t));
            })([e[0]], e.slice(1), !1)
          );
          if (l) return f(f({}, l), { id: i });
        }
        return !1;
      case 'error':
        return {
          method: r,
          id: i,
          data: e.map(function (r) {
            try {
              return r.stack || r;
            } catch (t) {
              return r;
            }
          }),
        };
      default:
        return { method: r, id: i, data: e };
    }
  };
  var p;
  !(function (r) {
    (r[(r.infinity = 0)] = 'infinity'),
      (r[(r.minusInfinity = 1)] = 'minusInfinity'),
      (r[(r.minusZero = 2)] = 'minusZero');
  })(p || (p = {}));
  const h = {
      type: 'Arithmetic',
      lookup: Number,
      shouldTransform: function (r, t) {
        return (
          'number' === r &&
          (t === 1 / 0 ||
            t === -1 / 0 ||
            (function (r) {
              return 1 / r == -1 / 0;
            })(t))
        );
      },
      toSerializable: function (r) {
        return r === 1 / 0
          ? p.infinity
          : r === -1 / 0
          ? p.minusInfinity
          : p.minusZero;
      },
      fromSerializable: function (r) {
        return r === p.infinity
          ? 1 / 0
          : r === p.minusInfinity
          ? -1 / 0
          : r === p.minusZero
          ? -0
          : r;
      },
    },
    m = {
      type: 'Function',
      lookup: Function,
      shouldTransform: function (r, t) {
        return 'function' == typeof t;
      },
      toSerializable: function (r) {
        var t = '';
        try {
          t = r
            .toString()
            .substring(t.indexOf('{') + 1, t.lastIndexOf('}'));
        } catch (r) {}
        return {
          name: r.name,
          body: t,
          proto: Object.getPrototypeOf(r).constructor.name,
        };
      },
      fromSerializable: function (r) {
        try {
          var t = function () {};
          return (
            'string' == typeof r.name &&
              Object.defineProperty(t, 'name', {
                value: r.name,
                writable: !1,
              }),
            'string' == typeof r.body &&
              Object.defineProperty(t, 'body', {
                value: r.body,
                writable: !1,
              }),
            'string' == typeof r.proto &&
              (t.constructor = { name: r.proto }),
            t
          );
        } catch (t) {
          return r;
        }
      },
    };
  var d;
  function y(r) {
    for (var t = {}, e = 0, n = r.attributes; e < n.length; e++) {
      var a = n[e];
      t[a.name] = a.value;
    }
    return t;
  }
  const v = {
    type: 'HTMLElement',
    shouldTransform: function (r, t) {
      return (
        t &&
        t.children &&
        'string' == typeof t.innerHTML &&
        'string' == typeof t.tagName
      );
    },
    toSerializable: function (r) {
      return {
        tagName: r.tagName.toLowerCase(),
        attributes: y(r),
        innerHTML: r.innerHTML,
      };
    },
    fromSerializable: function (r) {
      try {
        var t = (
          d ||
          (d = document.implementation.createHTMLDocument('sandbox'))
        ).createElement(r.tagName);
        t.innerHTML = r.innerHTML;
        for (
          var e = 0, n = Object.keys(r.attributes);
          e < n.length;
          e++
        ) {
          var a = n[e];
          try {
            t.setAttribute(a, r.attributes[a]);
          } catch (r) {}
        }
        return t;
      } catch (t) {
        return r;
      }
    },
  };
  function b(r) {
    return (
      (b =
        'function' == typeof Symbol &&
        'symbol' == typeof Symbol.iterator
          ? function (r) {
              return typeof r;
            }
          : function (r) {
              return r &&
                'function' == typeof Symbol &&
                r.constructor === Symbol &&
                r !== Symbol.prototype
                ? 'symbol'
                : typeof r;
            }),
      b(r)
    );
  }
  var g = function () {
    return (
      (g =
        Object.assign ||
        function (r) {
          for (var t, e = 1, n = arguments.length; e < n; e++)
            for (var a in (t = arguments[e]))
              Object.prototype.hasOwnProperty.call(t, a) &&
                (r[a] = t[a]);
          return r;
        }),
      g.apply(this, arguments)
    );
  };
  const S = {
    type: 'Map',
    shouldTransform: function (r, t) {
      return t && t.constructor && 'Map' === t.constructor.name;
    },
    toSerializable: function (r) {
      var t = {};
      return (
        r.forEach(function (r, e) {
          var n = 'object' == b(e) ? JSON.stringify(e) : e;
          t[n] = r;
        }),
        {
          name: 'Map',
          body: t,
          proto: Object.getPrototypeOf(r).constructor.name,
        }
      );
    },
    fromSerializable: function (r) {
      var t = r.body,
        e = g({}, t);
      return (
        'string' == typeof r.proto &&
          (e.constructor = { name: r.proto }),
        e
      );
    },
  };
  function T(r) {
    return (
      (T =
        'function' == typeof Symbol &&
        'symbol' == typeof Symbol.iterator
          ? function (r) {
              return typeof r;
            }
          : function (r) {
              return r &&
                'function' == typeof Symbol &&
                r.constructor === Symbol &&
                r !== Symbol.prototype
                ? 'symbol'
                : typeof r;
            }),
      T(r)
    );
  }
  var _ = /^#*@(t|r)$/,
    O = (0, eval)('this'),
    w = 'function' == typeof ArrayBuffer,
    A = 'function' == typeof Map,
    j = 'function' == typeof Set,
    M = [
      'Int8Array',
      'Uint8Array',
      'Uint8ClampedArray',
      'Int16Array',
      'Uint16Array',
      'Int32Array',
      'Uint32Array',
      'Float32Array',
      'Float64Array',
    ],
    z = Array.prototype.slice,
    k = {
      serialize: function (r) {
        return JSON.stringify(r);
      },
      deserialize: function (r) {
        return JSON.parse(r);
      },
    },
    C = (function () {
      function r(r, t) {
        (this.references = r),
          (this.transforms = t),
          (this.transformsMap = this._makeTransformsMap()),
          (this.circularCandidates = []),
          (this.circularCandidatesDescrs = []),
          (this.circularRefCount = 0);
      }
      return (
        (r._createRefMark = function (r) {
          var t = Object.create(null);
          return (t['@r'] = r), t;
        }),
        (r.prototype._createCircularCandidate = function (r, t, e) {
          this.circularCandidates.push(r),
            this.circularCandidatesDescrs.push({
              parent: t,
              key: e,
              refIdx: -1,
            });
        }),
        (r.prototype._applyTransform = function (r, t, e, n) {
          var a = Object.create(null),
            o = n.toSerializable(r);
          return (
            'object' === T(o) &&
              this._createCircularCandidate(r, t, e),
            (a['@t'] = n.type),
            (a.data = this._handleValue(
              function () {
                return o;
              },
              t,
              e
            )),
            a
          );
        }),
        (r.prototype._handleArray = function (r) {
          for (
            var t = [],
              e = function (e) {
                t[e] = n._handleValue(
                  function () {
                    return r[e];
                  },
                  t,
                  e
                );
              },
              n = this,
              a = 0;
            a < r.length;
            a++
          )
            e(a);
          return t;
        }),
        (r.prototype._handlePlainObject = function (r) {
          var t,
            e,
            n = Object.create(null),
            a = function (t) {
              if (Reflect.has(r, t)) {
                var e = _.test(t) ? '#'.concat(t) : t;
                n[e] = o._handleValue(
                  function () {
                    return r[t];
                  },
                  n,
                  e
                );
              }
            },
            o = this;
          for (var i in r) a(i);
          var s =
            null ===
              (e =
                null === (t = null == r ? void 0 : r.__proto__) ||
                void 0 === t
                  ? void 0
                  : t.constructor) || void 0 === e
              ? void 0
              : e.name;
          return (
            s && 'Object' !== s && (n.constructor = { name: s }), n
          );
        }),
        (r.prototype._handleObject = function (r, t, e) {
          return (
            this._createCircularCandidate(r, t, e),
            Array.isArray(r)
              ? this._handleArray(r)
              : this._handlePlainObject(r)
          );
        }),
        (r.prototype._ensureCircularReference = function (t) {
          var e = this.circularCandidates.indexOf(t);
          if (e > -1) {
            var n = this.circularCandidatesDescrs[e];
            return (
              -1 === n.refIdx &&
                (n.refIdx = n.parent ? ++this.circularRefCount : 0),
              r._createRefMark(n.refIdx)
            );
          }
          return null;
        }),
        (r.prototype._handleValue = function (r, t, e) {
          try {
            var n = r(),
              a = T(n),
              o = 'object' === a && null !== n;
            if (o) {
              var i = this._ensureCircularReference(n);
              if (i) return i;
            }
            var s = this._findTransform(a, n);
            return s
              ? this._applyTransform(n, t, e, s)
              : o
              ? this._handleObject(n, t, e)
              : n;
          } catch (r) {
            try {
              return this._handleValue(
                function () {
                  return r instanceof Error ? r : new Error(r);
                },
                t,
                e
              );
            } catch (r) {
              return null;
            }
          }
        }),
        (r.prototype._makeTransformsMap = function () {
          if (A) {
            var r = new Map();
            return (
              this.transforms.forEach(function (t) {
                t.lookup && r.set(t.lookup, t);
              }),
              r
            );
          }
        }),
        (r.prototype._findTransform = function (r, t) {
          if (
            A &&
            t &&
            t.constructor &&
            (null == (a = this.transformsMap.get(t.constructor))
              ? void 0
              : a.shouldTransform(r, t))
          )
            return a;
          for (var e = 0, n = this.transforms; e < n.length; e++) {
            var a;
            if ((a = n[e]).shouldTransform(r, t)) return a;
          }
        }),
        (r.prototype.transform = function () {
          for (
            var t = this,
              e = [
                this._handleValue(
                  function () {
                    return t.references;
                  },
                  null,
                  null
                ),
              ],
              n = 0,
              a = this.circularCandidatesDescrs;
            n < a.length;
            n++
          ) {
            var o = a[n];
            o.refIdx > 0 &&
              ((e[o.refIdx] = o.parent[o.key]),
              (o.parent[o.key] = r._createRefMark(o.refIdx)));
          }
          return e;
        }),
        r
      );
    })(),
    E = (function () {
      function r(r, t) {
        (this.activeTransformsStack = []),
          (this.visitedRefs = Object.create(null)),
          (this.references = r),
          (this.transformMap = t);
      }
      return (
        (r.prototype._handlePlainObject = function (r) {
          var t = Object.create(null);
          for (var e in ('constructor' in r &&
            ((r.constructor &&
              'string' == typeof r.constructor.name) ||
              (r.constructor = { name: 'Object' })),
          r))
            r.hasOwnProperty(e) &&
              (this._handleValue(r[e], r, e),
              _.test(e) && ((t[e.substring(1)] = r[e]), delete r[e]));
          for (var n in t) r[n] = t[n];
        }),
        (r.prototype._handleTransformedObject = function (r, t, e) {
          var n = r['@t'],
            a = this.transformMap[n];
          if (!a)
            throw new Error(
              'Can\'t find transform for "'.concat(n, '" type.')
            );
          this.activeTransformsStack.push(r),
            this._handleValue(r.data, r, 'data'),
            this.activeTransformsStack.pop(),
            (t[e] = a.fromSerializable(r.data));
        }),
        (r.prototype._handleCircularSelfRefDuringTransform =
          function (r, t, e) {
            var n = this.references;
            Object.defineProperty(t, e, {
              val: void 0,
              configurable: !0,
              enumerable: !0,
              get: function () {
                return (
                  void 0 === this.val && (this.val = n[r]), this.val
                );
              },
              set: function (r) {
                this.val = r;
              },
            });
          }),
        (r.prototype._handleCircularRef = function (r, t, e) {
          this.activeTransformsStack.includes(this.references[r])
            ? this._handleCircularSelfRefDuringTransform(r, t, e)
            : (this.visitedRefs[r] ||
                ((this.visitedRefs[r] = !0),
                this._handleValue(
                  this.references[r],
                  this.references,
                  r
                )),
              (t[e] = this.references[r]));
        }),
        (r.prototype._handleValue = function (r, t, e) {
          if ('object' === T(r) && null !== r) {
            var n = r['@r'];
            if (void 0 !== n) this._handleCircularRef(n, t, e);
            else if (r['@t']) this._handleTransformedObject(r, t, e);
            else if (Array.isArray(r))
              for (var a = 0; a < r.length; a++)
                this._handleValue(r[a], r, a);
            else this._handlePlainObject(r);
          }
        }),
        (r.prototype.transform = function () {
          return (
            (this.visitedRefs[0] = !0),
            this._handleValue(this.references[0], this.references, 0),
            this.references[0]
          );
        }),
        r
      );
    })(),
    N = [
      {
        type: '[[NaN]]',
        shouldTransform: function (r, t) {
          return 'number' === r && isNaN(t);
        },
        toSerializable: function () {
          return '';
        },
        fromSerializable: function () {
          return NaN;
        },
      },
      {
        type: '[[undefined]]',
        shouldTransform: function (r) {
          return 'undefined' === r;
        },
        toSerializable: function () {
          return '';
        },
        fromSerializable: function () {},
      },
      {
        type: '[[Date]]',
        lookup: Date,
        shouldTransform: function (r, t) {
          return t instanceof Date;
        },
        toSerializable: function (r) {
          return r.getTime();
        },
        fromSerializable: function (r) {
          var t = new Date();
          return t.setTime(r), t;
        },
      },
      {
        type: '[[RegExp]]',
        lookup: RegExp,
        shouldTransform: function (r, t) {
          return t instanceof RegExp;
        },
        toSerializable: function (r) {
          var t = { src: r.source, flags: '' };
          return (
            r.global && (t.flags += 'g'),
            r.ignoreCase && (t.flags += 'i'),
            r.multiline && (t.flags += 'm'),
            t
          );
        },
        fromSerializable: function (r) {
          return new RegExp(r.src, r.flags);
        },
      },
      {
        type: '[[Error]]',
        lookup: Error,
        shouldTransform: function (r, t) {
          return t instanceof Error;
        },
        toSerializable: function (r) {
          var t, e;
          return (
            r.stack ||
              null === (e = (t = Error).captureStackTrace) ||
              void 0 === e ||
              e.call(t, r),
            { name: r.name, message: r.message, stack: r.stack }
          );
        },
        fromSerializable: function (r) {
          var t = new (O[r.name] || Error)(r.message);
          return (t.stack = r.stack), t;
        },
      },
      {
        type: '[[ArrayBuffer]]',
        lookup: w && ArrayBuffer,
        shouldTransform: function (r, t) {
          return w && t instanceof ArrayBuffer;
        },
        toSerializable: function (r) {
          var t = new Int8Array(r);
          return z.call(t);
        },
        fromSerializable: function (r) {
          if (w) {
            var t = new ArrayBuffer(r.length);
            return new Int8Array(t).set(r), t;
          }
          return r;
        },
      },
      {
        type: '[[TypedArray]]',
        shouldTransform: function (r, t) {
          if (w)
            return ArrayBuffer.isView(t) && !(t instanceof DataView);
          for (var e = 0, n = M; e < n.length; e++) {
            var a = n[e];
            if ('function' == typeof O[a] && t instanceof O[a])
              return !0;
          }
          return !1;
        },
        toSerializable: function (r) {
          return { ctorName: r.constructor.name, arr: z.call(r) };
        },
        fromSerializable: function (r) {
          return 'function' == typeof O[r.ctorName]
            ? new O[r.ctorName](r.arr)
            : r.arr;
        },
      },
      {
        type: '[[Map]]',
        lookup: A && Map,
        shouldTransform: function (r, t) {
          return A && t instanceof Map;
        },
        toSerializable: function (r) {
          var t = [];
          return (
            r.forEach(function (r, e) {
              t.push(e), t.push(r);
            }),
            t
          );
        },
        fromSerializable: function (r) {
          if (A) {
            for (var t = new Map(), e = 0; e < r.length; e += 2)
              t.set(r[e], r[e + 1]);
            return t;
          }
          for (var n = [], a = 0; a < r.length; a += 2)
            n.push([r[e], r[e + 1]]);
          return n;
        },
      },
      {
        type: '[[Set]]',
        lookup: j && Set,
        shouldTransform: function (r, t) {
          return j && t instanceof Set;
        },
        toSerializable: function (r) {
          var t = [];
          return (
            r.forEach(function (r) {
              t.push(r);
            }),
            t
          );
        },
        fromSerializable: function (r) {
          if (j) {
            for (var t = new Set(), e = 0; e < r.length; e++)
              t.add(r[e]);
            return t;
          }
          return r;
        },
      },
    ],
    R = (function () {
      function r(r) {
        (this.transforms = []),
          (this.transformsMap = Object.create(null)),
          (this.serializer = r || k),
          this.addTransforms(N);
      }
      return (
        (r.prototype.addTransforms = function (r) {
          for (
            var t = 0, e = (r = Array.isArray(r) ? r : [r]);
            t < e.length;
            t++
          ) {
            var n = e[t];
            if (this.transformsMap[n.type])
              throw new Error(
                'Transform with type "'.concat(
                  n.type,
                  '" was already added.'
                )
              );
            this.transforms.push(n), (this.transformsMap[n.type] = n);
          }
          return this;
        }),
        (r.prototype.removeTransforms = function (r) {
          for (
            var t = 0, e = (r = Array.isArray(r) ? r : [r]);
            t < e.length;
            t++
          ) {
            var n = e[t],
              a = this.transforms.indexOf(n);
            a > -1 && this.transforms.splice(a, 1),
              delete this.transformsMap[n.type];
          }
          return this;
        }),
        (r.prototype.encode = function (r) {
          var t = new C(r, this.transforms).transform();
          return this.serializer.serialize(t);
        }),
        (r.prototype.decode = function (r) {
          var t = this.serializer.deserialize(r);
          return new E(t, this.transformsMap).transform();
        }),
        r
      );
    })(),
    I = [v, m, h, S],
    x = new R();
  function P(r) {
    return JSON.parse(x.encode(r));
  }
  x.addTransforms(I),
    (function (r, t, n) {
      void 0 === n && (n = !0);
      for (
        var a = r,
          o = {
            pointers: {},
            src: {
              npm: 'https://npmjs.com/package/console-feed',
              github: 'https://github.com/samdenty99/console-feed',
            },
          },
          i = function (r) {
            var t = a[r];
            (a[r] = function () {
              t.apply(this, arguments);
              var e = [].slice.call(arguments);
              setTimeout(function () {
                var t = l(r, e);
                if (t) {
                  n && P(t);
                }
              });
            }),
              (o.pointers[r] = t);
          },
          s = 0,
          u = e;
        s < u.length;
        s++
      )
        i(u[s]);
      a.feed = o;
    })(window.console, 0, !0);
})();
