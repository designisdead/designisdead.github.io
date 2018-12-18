<script>
  // Get the resulting value from  `:col=` prop
  // based on the window width
  var breakpointValue = function (mixed, windowWidth) {
    var valueAsNum = parseInt(mixed);

    if (valueAsNum > -1) {
      return mixed;
    } else if (typeof mixed !== 'object') {
      return 0;
    }

    var matchedBreakpoint = Infinity;
    var matchedValue = mixed.default || 0;

    for (var k in mixed) {
      var breakpoint = parseInt(k);
      var breakpointValRaw = mixed[breakpoint];
      var breakpointVal = parseInt(breakpointValRaw);

      if (isNaN(breakpoint) || isNaN(breakpointVal)) {
        continue;
      }

      var isNewBreakpoint = windowWidth <= breakpoint && breakpoint < matchedBreakpoint;

      if (isNewBreakpoint) {
        matchedBreakpoint = breakpoint;
        matchedValue = breakpointValRaw;
      }
    }
    return matchedValue;
  };
  let loading = true;
  let foo = 'bar';

  export default {
    props: {
      cols: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    data: function data() {
      return {
        displayColumns: 2,
        containerHeight: 0,
      }
    },
    mounted() {
      // Bind resize handler to page
      if (window) {
        window.addEventListener('resize', this.reCalculate);
      }
    },
    updated() {
      this.$nextTick(() => {
        this.reCalculate();
        this.updateOffset();
      });
    },
    beforeDestroy: function beforeDestroy() {
      if (window) {
        window.removeEventListener('resize', this.reCalculate);
      }
    },
    methods: {
      // Recalculate how many columns to display based on window width
      // and the value of the passed `:cols=` prop
      reCalculate() {
        var previousWindowWidth = this.windowWidth;
        this.windowWidth = (window ? window.innerWidth : null) || Infinity;

        if (previousWindowWidth === this.windowWidth) {
          return;
        }

        this.reCalculateColumnCount(this.windowWidth);
        this.updateOffset();
      },

      updateOffset() {
        const columns = this.$el.querySelectorAll(".EqualColumns-column");
        let shortestColumn = columns[0];
        let percentage = 0;

        const updateColumnOffset = (column, y) => {
          column.style.webkitTransform = "translate3d(0, -" + Math.round(y) + "px, 0)";
          column.style.transform = "translate3d(0, -" + Math.round(y) + "px, 0)";
        }

        const raf = () => {
          columns.forEach(column => {
            if (column.offsetHeight < shortestColumn.offsetHeight) {
              shortestColumn = column;
            }
          });

          // set container height
          this.$el.style.height = shortestColumn.offsetHeight - 1 + 'px';

          percentage = (-shortestColumn.getBoundingClientRect().top) / (shortestColumn.offsetHeight - window.innerHeight);
          columns.forEach(column => {
            if (percentage < 0) {
              updateColumnOffset(column, 0);
            }
            else if (percentage < 1) {
              updateColumnOffset(column, percentage * (column.getBoundingClientRect().height - shortestColumn.getBoundingClientRect().height));

            }
            else {
              updateColumnOffset(column, 1 * (column.getBoundingClientRect().height - shortestColumn.getBoundingClientRect().height));
            }
          });

          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      },

      reCalculateColumnCount(windowWidth) {
        var newColumns = breakpointValue(this.cols, windowWidth);

        // Make sure we can return a valid value
        newColumns = Math.max(1, Number(newColumns) || 0);

        this.displayColumns = newColumns;
      },

      getChildItemsInColumnsArray() {
        var columns = [];
        var childItems = this.$slots.default || [];

        // Loop through child elements
        for (var i = 0, visibleItemI = 0; i < childItems.length; i++, visibleItemI++) {
          // skip Vue elements without tags, which includes
          // whitespace elements and also plain text
          if (!childItems[i].tag) {
            visibleItemI--;
            continue;
          }

          // Get the column index the child item will end up in
          var columnIndex = visibleItemI % this.displayColumns;

          if (!columns[columnIndex]) {
            columns[columnIndex] = [];
          }

          columns[columnIndex].push(childItems[i]);
        }
        return columns;
      }
    },

    render: function (createElement) {
      const columnsContainingChildren = this.getChildItemsInColumnsArray();
      const columns = columnsContainingChildren.map(function (children, index) {
        /// Create column element and inject the children
        return createElement('div', {
          key: index + '-' + columnsContainingChildren.length,
          class: 'EqualColumns-column',
        }, children); // specify child items here
      });

      // Return wrapper with columns
      const containerAttributes = process.server ? {} :  {
        class: 'EqualColumns',
        style: {
          'height': this.containerHeight - 3 + 'px'
        }
      }

      return createElement('div', containerAttributes, columns);
    }
  }
</script>

<style lang="scss">
  .EqualColumns {
    display: flex;
    align-items: flex-start;
    overflow: hidden;
  }

  .EqualColumns-column {
    flex: 1;
    will-change: transform;
    transform: translate3d(0, 0, 0);
  }
</style>
