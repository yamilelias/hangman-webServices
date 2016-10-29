/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package edu.client;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import org.json.*;

/**
 *
 * @author Yamil Elías <yamileliassoto@gmail.com>
 *
 */
public class WebserviceConsumer {

    public String getWord(String wsURL){
        String word = "";
        
        try{
            String content = this.getUrlContents(wsURL);
            JSONObject json = new JSONObject(content);
            JSONObject response = (JSONObject) json.get("response");
            JSONObject randomWord = (JSONObject) response.get("randomword");
            
            //word = content;
            word = randomWord.getString("description");
        } catch(Exception e){
            word = e.getMessage();
        }
        return word;
    }
    
    private String getUrlContents(String theUrl) {
        StringBuilder content = new StringBuilder();

        // many of these calls can throw exceptions, so i've just
        // wrapped them all in one try/catch statement.
        try {
            // create a url object
            URL url = new URL(theUrl);

            // create a urlconnection object
            URLConnection urlConnection = url.openConnection();

            // wrap the urlconnection in a bufferedreader
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));

            String line;

            // read from the urlconnection via the bufferedreader
            while ((line = bufferedReader.readLine()) != null) {
                content.append(line + "\n");
            }
            bufferedReader.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return content.toString();
    }
}
