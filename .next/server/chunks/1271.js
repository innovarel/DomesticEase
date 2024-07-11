"use strict";exports.id=1271,exports.ids=[1271],exports.modules={81271:(t,e,s)=>{s.d(e,{a:()=>E});var r=s(28651),i=s(41466),n=s(98441),u=s(80057),h=s(14902),a=class extends u.l{constructor(t,e){super(),this.options=e,this.#t=t,this.#e=null,this.bindMethods(),this.setOptions(e)}#t;#s=void 0;#r=void 0;#i=void 0;#n;#u;#e;#h;#a;#o;#c;#l;#d;#p=new Set;bindMethods(){this.refetch=this.refetch.bind(this)}onSubscribe(){1===this.listeners.size&&(this.#s.addObserver(this),o(this.#s,this.options)?this.#f():this.updateResult(),this.#R())}onUnsubscribe(){this.hasListeners()||this.destroy()}shouldFetchOnReconnect(){return c(this.#s,this.options,this.options.refetchOnReconnect)}shouldFetchOnWindowFocus(){return c(this.#s,this.options,this.options.refetchOnWindowFocus)}destroy(){this.listeners=new Set,this.#y(),this.#v(),this.#s.removeObserver(this)}setOptions(t,e){let s=this.options,i=this.#s;if(this.options=this.#t.defaultQueryOptions(t),void 0!==this.options.enabled&&"boolean"!=typeof this.options.enabled)throw Error("Expected enabled to be a boolean");this.#b(),this.#s.setOptions(this.options),s._defaulted&&!(0,r.VS)(this.options,s)&&this.#t.getQueryCache().notify({type:"observerOptionsUpdated",query:this.#s,observer:this});let n=this.hasListeners();n&&l(this.#s,i,this.options,s)&&this.#f(),this.updateResult(e),n&&(this.#s!==i||this.options.enabled!==s.enabled||this.options.staleTime!==s.staleTime)&&this.#Q();let u=this.#m();n&&(this.#s!==i||this.options.enabled!==s.enabled||u!==this.#d)&&this.#O(u)}getOptimisticResult(t){let e=this.#t.getQueryCache().build(this.#t,t),s=this.createResult(e,t);return(0,r.VS)(this.getCurrentResult(),s)||(this.#i=s,this.#u=this.options,this.#n=this.#s.state),s}getCurrentResult(){return this.#i}trackResult(t,e){let s={};return Object.keys(t).forEach(r=>{Object.defineProperty(s,r,{configurable:!1,enumerable:!0,get:()=>(this.trackProp(r),e?.(r),t[r])})}),s}trackProp(t){this.#p.add(t)}getCurrentQuery(){return this.#s}refetch({...t}={}){return this.fetch({...t})}fetchOptimistic(t){let e=this.#t.defaultQueryOptions(t),s=this.#t.getQueryCache().build(this.#t,e);return s.isFetchingOptimistic=!0,s.fetch().then(()=>this.createResult(s,e))}fetch(t){return this.#f({...t,cancelRefetch:t.cancelRefetch??!0}).then(()=>(this.updateResult(),this.#i))}#f(t){this.#b();let e=this.#s.fetch(this.options,t);return t?.throwOnError||(e=e.catch(r.ZT)),e}#Q(){if(this.#y(),r.sk||this.#i.isStale||!(0,r.PN)(this.options.staleTime))return;let t=(0,r.Kp)(this.#i.dataUpdatedAt,this.options.staleTime);this.#c=setTimeout(()=>{this.#i.isStale||this.updateResult()},t+1)}#m(){return("function"==typeof this.options.refetchInterval?this.options.refetchInterval(this.#s):this.options.refetchInterval)??!1}#O(t){this.#v(),this.#d=t,!r.sk&&!1!==this.options.enabled&&(0,r.PN)(this.#d)&&0!==this.#d&&(this.#l=setInterval(()=>{(this.options.refetchIntervalInBackground||n.j.isFocused())&&this.#f()},this.#d))}#R(){this.#Q(),this.#O(this.#m())}#y(){this.#c&&(clearTimeout(this.#c),this.#c=void 0)}#v(){this.#l&&(clearInterval(this.#l),this.#l=void 0)}createResult(t,e){let s;let i=this.#s,n=this.options,u=this.#i,a=this.#n,c=this.#u,p=t!==i?t.state:this.#r,{state:f}=t,R={...f},y=!1;if(e._optimisticResults){let s=this.hasListeners(),r=!s&&o(t,e),u=s&&l(t,i,e,n);(r||u)&&(R={...R,...(0,h.z)(f.data,t.options)}),"isRestoring"===e._optimisticResults&&(R.fetchStatus="idle")}let{error:v,errorUpdatedAt:b,status:Q}=R;if(e.select&&void 0!==R.data){if(u&&R.data===a?.data&&e.select===this.#h)s=this.#a;else try{this.#h=e.select,s=e.select(R.data),s=(0,r.oE)(u?.data,s,e),this.#a=s,this.#e=null}catch(t){this.#e=t}}else s=R.data;if(void 0!==e.placeholderData&&void 0===s&&"pending"===Q){let t;if(u?.isPlaceholderData&&e.placeholderData===c?.placeholderData)t=u.data;else if(t="function"==typeof e.placeholderData?e.placeholderData(this.#o?.state.data,this.#o):e.placeholderData,e.select&&void 0!==t)try{t=e.select(t),this.#e=null}catch(t){this.#e=t}void 0!==t&&(Q="success",s=(0,r.oE)(u?.data,t,e),y=!0)}this.#e&&(v=this.#e,s=this.#a,b=Date.now(),Q="error");let m="fetching"===R.fetchStatus,O="pending"===Q,I="error"===Q,S=O&&m,g=void 0!==s;return{status:Q,fetchStatus:R.fetchStatus,isPending:O,isSuccess:"success"===Q,isError:I,isInitialLoading:S,isLoading:S,data:s,dataUpdatedAt:R.dataUpdatedAt,error:v,errorUpdatedAt:b,failureCount:R.fetchFailureCount,failureReason:R.fetchFailureReason,errorUpdateCount:R.errorUpdateCount,isFetched:R.dataUpdateCount>0||R.errorUpdateCount>0,isFetchedAfterMount:R.dataUpdateCount>p.dataUpdateCount||R.errorUpdateCount>p.errorUpdateCount,isFetching:m,isRefetching:m&&!O,isLoadingError:I&&!g,isPaused:"paused"===R.fetchStatus,isPlaceholderData:y,isRefetchError:I&&g,isStale:d(t,e),refetch:this.refetch}}updateResult(t){let e=this.#i,s=this.createResult(this.#s,this.options);if(this.#n=this.#s.state,this.#u=this.options,void 0!==this.#n.data&&(this.#o=this.#s),(0,r.VS)(s,e))return;this.#i=s;let i={};t?.listeners!==!1&&(()=>{if(!e)return!0;let{notifyOnChangeProps:t}=this.options,s="function"==typeof t?t():t;if("all"===s||!s&&!this.#p.size)return!0;let r=new Set(s??this.#p);return this.options.throwOnError&&r.add("error"),Object.keys(this.#i).some(t=>this.#i[t]!==e[t]&&r.has(t))})()&&(i.listeners=!0),this.#I({...i,...t})}#b(){let t=this.#t.getQueryCache().build(this.#t,this.options);if(t===this.#s)return;let e=this.#s;this.#s=t,this.#r=t.state,this.hasListeners()&&(e?.removeObserver(this),t.addObserver(this))}onQueryUpdate(){this.updateResult(),this.hasListeners()&&this.#R()}#I(t){i.V.batch(()=>{t.listeners&&this.listeners.forEach(t=>{t(this.#i)}),this.#t.getQueryCache().notify({query:this.#s,type:"observerResultsUpdated"})})}};function o(t,e){return!1!==e.enabled&&void 0===t.state.data&&!("error"===t.state.status&&!1===e.retryOnMount)||void 0!==t.state.data&&c(t,e,e.refetchOnMount)}function c(t,e,s){if(!1!==e.enabled){let r="function"==typeof s?s(t):s;return"always"===r||!1!==r&&d(t,e)}return!1}function l(t,e,s,r){return(t!==e||!1===r.enabled)&&(!s.suspense||"error"!==t.state.status)&&d(t,s)}function d(t,e){return!1!==e.enabled&&t.isStaleByTime(e.staleTime)}var p=s(3729);s(95344);var f=p.createContext(function(){let t=!1;return{clearReset:()=>{t=!1},reset:()=>{t=!0},isReset:()=>t}}()),R=()=>p.useContext(f),y=s(26274),v=p.createContext(!1),b=()=>p.useContext(v);v.Provider;var Q=s(63701),m=(t,e)=>{(t.suspense||t.throwOnError)&&!e.isReset()&&(t.retryOnMount=!1)},O=t=>{p.useEffect(()=>{t.clearReset()},[t])},I=({result:t,errorResetBoundary:e,throwOnError:s,query:r})=>t.isError&&!e.isReset()&&!t.isFetching&&r&&(0,Q.L)(s,[t.error,r]),S=t=>{t.suspense&&"number"!=typeof t.staleTime&&(t.staleTime=1e3)},g=(t,e)=>t?.suspense&&e.isPending,C=(t,e,s)=>e.fetchOptimistic(t).catch(()=>{s.clearReset()});function E(t,e){return function(t,e,s){let r=(0,y.NL)(s),n=b(),u=R(),h=r.defaultQueryOptions(t);h._optimisticResults=n?"isRestoring":"optimistic",S(h),m(h,u),O(u);let[a]=p.useState(()=>new e(r,h)),o=a.getOptimisticResult(h);if(p.useSyncExternalStore(p.useCallback(t=>{let e=n?()=>void 0:a.subscribe(i.V.batchCalls(t));return a.updateResult(),e},[a,n]),()=>a.getCurrentResult(),()=>a.getCurrentResult()),p.useEffect(()=>{a.setOptions(h,{listeners:!1})},[h,a]),g(h,o))throw C(h,a,u);if(I({result:o,errorResetBoundary:u,throwOnError:h.throwOnError,query:r.getQueryCache().get(h.queryHash)}))throw o.error;return h.notifyOnChangeProps?o:a.trackResult(o)}(t,a,e)}},63701:(t,e,s)=>{function r(t,e){return"function"==typeof t?t(...e):!!t}function i(){}s.d(e,{L:()=>r,Z:()=>i})}};