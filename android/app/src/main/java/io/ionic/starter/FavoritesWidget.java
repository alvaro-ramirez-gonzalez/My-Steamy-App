package io.ionic.starter;

import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Handler;
import android.os.Looper;
import android.view.View;
import android.widget.RemoteViews;
import java.net.URL;
import java.util.concurrent.Executors;

public class FavoritesWidget extends AppWidgetProvider {

  @Override
  public void onUpdate(Context context, AppWidgetManager manager, int[] ids) {
    actualizarUI(context);
  }

  @Override
  public void onReceive(Context context, Intent intent) {
    super.onReceive(context, intent);
    actualizarUI(context);
  }

  private void actualizarUI(Context context) {
    AppWidgetManager manager = AppWidgetManager.getInstance(context);
    int[] ids = manager.getAppWidgetIds(new ComponentName(context, FavoritesWidget.class));
    if (ids == null) return;

    SharedPreferences prefs = context.getSharedPreferences("CapacitorStorage", Context.MODE_PRIVATE);

    for (int id : ids) {
      RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.favorites_widget);

      
      String titulo = extraer(prefs, "w_title", "Selecciona un juego");
      String precio = extraer(prefs, "w_price", "0.00");
      String desc = extraer(prefs, "w_discount", "0");
      String imgUrl = extraer(prefs, "w_image", "");
      String storeIconUrl = extraer(prefs, "w_store", "");

     
      views.setTextViewText(R.id.widget_title, titulo);
      views.setTextViewText(R.id.widget_price, "$" + precio);

    
      if (desc.equals("0") || desc.isEmpty()) {
        views.setViewVisibility(R.id.widget_discount, View.GONE);
      } else {
        views.setViewVisibility(R.id.widget_discount, View.VISIBLE);
        views.setTextViewText(R.id.widget_discount, "-" + desc + "%");
      }

     
      if (!imgUrl.isEmpty()) {
        descargarImagen(imgUrl, views, R.id.widget_image, id, manager);
      }
      if (!storeIconUrl.isEmpty()) {
        descargarImagen(storeIconUrl, views, R.id.widget_store_icon, id, manager);
      }

      manager.updateAppWidget(id, views);
    }
  }

  private void descargarImagen(String url, RemoteViews views, int viewId, int widgetId, AppWidgetManager manager) {
    Executors.newSingleThreadExecutor().execute(() -> {
      try {
        Bitmap b = BitmapFactory.decodeStream(new URL(url).openStream());
        new Handler(Looper.getMainLooper()).post(() -> {
          views.setImageViewBitmap(viewId, b);
          manager.updateAppWidget(widgetId, views);
        });
      } catch (Exception e) {
        e.printStackTrace();
      }
    });
  }

  private String extraer(SharedPreferences p, String k, String d) {
    String v = p.getString("_cap_" + k, null);
    if (v == null) v = p.getString(k, d);
    return (v == null || v.equals("null")) ? d : v.replace("\"", "");
  }
}
