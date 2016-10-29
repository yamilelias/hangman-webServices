/*
 * Copyright (C) 2016 Yamil Elías <yamileliassoto@gmail.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
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

    /**
     * Retrieve random word from supplying web service.
     * @param wsURL
     * @return 
     */
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
    
    /**
     * Get the contents that the provided URL have to show.
     * @param theUrl
     * @return 
     */
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
