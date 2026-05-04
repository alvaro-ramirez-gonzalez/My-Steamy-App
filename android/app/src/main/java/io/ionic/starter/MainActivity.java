package io.ionic.starter;

import android.appwidget.AppWidgetManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

  @Override
  public void onPause() { 
    super.onPause();
    actualizarElWidgetAhora();
  }

  @Override
  public void onStop() { 
    super.onStop();
    actualizarElWidgetAhora();
  }

  private void actualizarElWidgetAhora() {
    try {
      Context context = getApplicationContext();

      Intent intent = new Intent(context, FavoritesWidget.class);
      intent.setAction(AppWidgetManager.ACTION_APPWIDGET_UPDATE);

      AppWidgetManager manager = AppWidgetManager.getInstance(context);
      ComponentName name = new ComponentName(context, FavoritesWidget.class);
      int[] ids = manager.getAppWidgetIds(name);

      if (ids != null && ids.length > 0) {
        intent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, ids);
        context.sendBroadcast(intent);
      }
    } catch (Exception e) {
      android.util.Log.e("WIDGET_ERROR", "Error: " + e.getMessage());
    }
  }
}
