document.addEventListener('DOMContentLoaded', () => {
    const chartContainer = document.getElementById('chart-container');
    const chart = LightweightCharts.createChart(chartContainer, {
        width: chartContainer.clientWidth,
        height: chartContainer.clientHeight,
        layout: {
            backgroundColor: '#ffffff',
            textColor: '#333333',
        },
        grid: {
            vertLines: {
                color: '#e5e5e5',
            },
            horzLines: {
                color: '#e5e5e5',
            },
        },
        crosshair: {
            mode: LightweightCharts.CrosshairMode.Normal,
        },
        priceScale: {
            borderColor: '#cccccc',
        },
        timeScale: {
            borderColor: '#cccccc',
            timeVisible: true,
            secondsVisible: false,
        },
    });

    const candlestickSeries = chart.addCandlestickSeries({
        upColor: '#4bffb5',
        downColor: '#ff4976',
        borderDownColor: '#ff4976',
        borderUpColor: '#4bffb5',
        wickDownColor: '#838ca1',
        wickUpColor: '#838ca1',
    });

    fetch('https://client-api-2-74b1891ee9f9.herokuapp.com/candlesticks/4CyNYFoLWeVfLZiXBr1L49et5MpQxsF8TDbnzEu2M1Si')
        .then(response => response.json())
        .then(data => {
            const cdata = data.map(d => ({
                time: d.timestamp,
                open: d.open,
                high: d.high,
                low: d.low,
                close: d.close,
            }));
            candlestickSeries.setData(cdata);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    window.addEventListener('resize', () => {
        chart.applyOptions({
            width: chartContainer.clientWidth,
            height: chartContainer.clientHeight,
        });
    });
});
