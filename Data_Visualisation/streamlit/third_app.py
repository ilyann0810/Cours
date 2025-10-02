import streamlit as st
import pandas as pd
import numpy as np

st.title('Plotting data in streamlit the native way !')

# Create chart_data and force pandas DataFrame
chart_data = np.random.randn(20, 3)
chart_data = pd.DataFrame(chart_data, columns=['a', 'b', 'c'])

st.write('Below is a randomn dataFrame:', chart_data)

st.write('Plotting the column "a" with st.line_chart')
st.line_chart(pd.DataFrame(chart_data['a']))

st.write('Plotting all the columns with st.line_chart')
st.line_chart(chart_data)

st.write('Plotting the same dataframe in an area chart with st.area_chart')
st.area_chart(chart_data)

st.write('Plotting the same dataframe in a bar chart with st.bar_chart')
st.bar_chart(chart_data)

# Create df_map and force pandas DataFrame
df_map = np.random.randn(1000, 2) / [50, 50] + [37.76, -122.4]
df_map = pd.DataFrame(df_map, columns=['lat', 'lon'])

st.write('Display a map with points on it. Using an other randomn dataframe')
st.map(df_map)