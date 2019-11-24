package com.vijaya.speechtotext;

import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.Preference;
import android.speech.RecognizerIntent;
import android.support.v4.app.NotificationCompatSideChannelService;
import android.support.v7.app.AppCompatActivity;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.Log;
import android.view.View;
import android.widget.ImageButton;
import android.widget.TextView;
import android.speech.tts.TextToSpeech;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Locale;
import java.util.prefs.Preferences;

public class MainActivity extends AppCompatActivity implements
        TextToSpeech.OnInitListener{

    private static final int REQ_CODE_SPEECH_INPUT = 100;
    private TextView mVoiceInputTv;
    private ImageButton mSpeakBtn;
    private static final String NAME = "name";
    private SharedPreferences preferences;
    private SharedPreferences.Editor editor;
    private static String USERNAME = "";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mVoiceInputTv = (TextView) findViewById(R.id.voiceInput);
        mSpeakBtn = (ImageButton) findViewById(R.id.btnSpeak);
        mSpeakBtn.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v) {
                startVoiceInput();
            }
        });

        mVoiceInputTv.addTextChangedListener(new TextWatcher() {
            TextToSpeech tts = new TextToSpeech(MainActivity.this,MainActivity.this);
            public void afterTextChanged(Editable s) {

               Log.i("viewtext", mVoiceInputTv.getText().toString());
               if(mVoiceInputTv.getText().toString().equals("hello"))
               {
                   Log.i("viewtext", "here");

                   tts.setLanguage(Locale.US);
                   tts.speak("What is your name", TextToSpeech.QUEUE_FLUSH, null);
               }
               if(mVoiceInputTv.getText().toString().equals("I can understand. Please tell your symptoms in short."))
               {

                    tts.setLanguage(Locale.US);
                    tts.speak("I can understand. Please tell your symptoms in short.", TextToSpeech.QUEUE_FLUSH, null);
               }
               else {
                   tts.setLanguage(Locale.US);
                   tts.speak(mVoiceInputTv.getText().toString(), TextToSpeech.QUEUE_FLUSH, null);
               }
            }

            public void beforeTextChanged(CharSequence s, int start, int count, int after) {}

            public void onTextChanged(CharSequence s, int start, int before, int count) {}
        });
    }

    private void startVoiceInput() {
        Intent intent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
        intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
        intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE, Locale.getDefault());
        intent.putExtra(RecognizerIntent.EXTRA_PROMPT, "Hello, How can I help you?");
        try {
            startActivityForResult(intent, REQ_CODE_SPEECH_INPUT);
        } catch (ActivityNotFoundException a) {

        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        switch (requestCode) {
            case REQ_CODE_SPEECH_INPUT: {
                if (resultCode == RESULT_OK && null != data) {
                    ArrayList<String> result = data.getStringArrayListExtra(RecognizerIntent.EXTRA_RESULTS);
                    if(result.get(0).contains("name")) {

                        int length = result.get(0).length();
                        Log.i("Indexname", result.get(0).substring(result.get(0).indexOf("is") + 3, length));
                        preferences = getSharedPreferences("PREFS", 0);
                        editor = preferences.edit();
                        editor.putString(NAME, result.get(0).substring(result.get(0).indexOf("is") + 3, length)).apply();
                        USERNAME = result.get(0).substring(result.get(0).indexOf("is") + 3, length);
                        mVoiceInputTv.setText("Hi " + result.get(0).substring(result.get(0).indexOf("is") + 3, length));
                    }
                    if(result.get(0).toLowerCase().equals(("i am not feeling good what should i do").toLowerCase()))
                    {
                        Log.i("secondcase", "triggered");
                        mVoiceInputTv.setText("I can understand. Please tell your symptoms in short.");
                    }//Thank you, my Medical Assistant
                    if(result.get(0).toLowerCase().equals(("thank you my medical assistant").toLowerCase()))
                    {
                        Log.i("Thirdcase", "triggered");
                        mVoiceInputTv.setText("Thank you too " + USERNAME+ " .Take care");
                    }
                    if(result.get(0).toLowerCase().equals(("what time is it").toLowerCase()))
                    {
                        Log.i("Forthcase", "triggered");
                        SimpleDateFormat sdfDate = new SimpleDateFormat("HH:mm a");//dd/MM/yyyy
                        Date now = new Date();
                        String[] strDate = sdfDate.format(now).split(":");
                        if(strDate[1].contains("00"))
                        {
                            strDate[1] = "o'clock";
                        }
                        Log.i("Date","The time is " + sdfDate.format(now));
                        mVoiceInputTv.setText("The time is " + sdfDate.format(now));
                    }
                    if (result.get(0).toLowerCase().equals(("hello").toLowerCase())){
                        mVoiceInputTv.setText(result.get(0));
                    }
                }
                break;
            }

        }
    }

    @Override
    public void onInit(int status) {

    }
}