var date = new Date()
var displayDate = "Date: " + date.toLocaleDateString()

$(document).ready(function(){

    console.log('Ready')

    
    $("#display_date").html(displayDate)


    //  write an event, when Submit button is clicked
    $('#button').click(function(){ 

        //  get the text value from the textarea using the 'val()' method
        let text_value = $('#text').val()

        //  Convert it to JS object.
        //  Provide a 'key' here and in write the same in app.py file as well to extract data
        let input_text = {'review' : text_value}
        console.log(input_text)

        //  ajax request
        $.ajax({

            //  type of web request
            type : 'POST',

            //  Data to be sent in JSON format
            data : JSON.stringify(input_text),

            //  type of response expected is json
            dataType : 'json',

            //  contentType
            contentType : 'application/json',

            //  if everything is successful, run this function
            success : function(result){

                // extract prediction and emoticon url from result
                let sentiment = result.predicted_emotion;
                let image_path = result.predicted_emotion_image_url

                //  update the DOM elements
                $('#sentiment').html(sentiment);
                $('#emoji').attr('src', image_path);

                //  show them   
                $('#sentiment').show();
                $('#emoji').show();

            },

            //  if any error, run this function
            error : function(result){

                console.log(result)
            }
        })


        //  clearing the textbox after every button push
        $('#text').val("")
    })
        
})