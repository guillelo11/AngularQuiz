angular.module('appPreguntas', [])
  .controller('controladorPreguntas', ['$scope', function ($scope) {

    $scope.questions = [
        {
            id : 1,
            text:'¿Cuál es la capital de Australia?',
            validAnswer : 3,
            userAnswer : null,
            status : '',
            answers: [
                {id : 1, text : 'Sydney'},
                {id : 2, text : 'Melbourne'},
                {id : 3, text : 'Canberra'}
            ]
        },
        {
            id : 2,
            text:'¿Cuál es el río más largo de Europa?',
            validAnswer : 1,
            userAnswer : null,
            status : '',
            answers: [
                {id : 1, text : 'Volga'},
                {id : 2, text : 'Danubio'},
                {id : 3, text : 'Ebro'},
                {id : 4, text : 'Sena'}
            ]
        },
        {
            id : 3,
            text:'¿Cuál fue la capital de Alemania Occidental?',
            validAnswer : 4,
            userAnswer : null,
            status : '',
            answers: [
                {id : 1, text : 'Berlin'},
                {id : 2, text : 'München'},
                {id : 3, text : 'Köln'},
                {id : 4, text : 'Bonn'},
                {id : 5, text : 'Frankfurt'}
            ]
        },
        {
            id : 4,
            text:'¿Cuál es la capital de Noruega?',
            validAnswer : 3,
            userAnswer : null,
            status : '',
            answers: [
                {id : 1, text : 'Bergen'},
                {id : 2, text : 'Malmö'},
                {id : 3, text : 'Oslo'},
                {id : 4, text : 'Hamburg'}
            ]
        },
        {
            id : 5,
            text:'¿Qué países tienen frontera con Luxemburgo?',
            validAnswer : [1, 2, 4],
            userAnswer : [],
            status : '',
            answers: [
                {id : 1, text : 'Francia'},
                {id : 2, text : 'Alemania'},
                {id : 3, text : 'Holanda'},
                {id : 4, text : 'Bélgica'}
            ]
        },
        {
            id : 6,
            text:'¿Qué rio pasa por Berlin?',
            validAnswer : 2,
            userAnswer : null,
            status : '',
            answers: [
                {id : 1, text : 'Rhein'},
                {id : 2, text : 'Spree'},
                {id : 3, text : 'Elbe'}
            ]
        },
        {
            id : 7,
            text:'¿Cuál es la capital de Slovakia?',
            validAnswer : 4,
            userAnswer : null,
            status : '',
            answers: [
                {id : 1, text : 'Skopje'},
                {id : 2, text : 'Ljubljana'},
                {id : 3, text : 'Bucarest'},
                {id : 4, text : 'Bratislava'}
            ]
        },
        {
            id : 8,
            text:'¿Qué paises pertenecen a la UE?',
            validAnswer : [2, 4, 5],
            userAnswer : [],
            status : '',
            answers: [
                {id : 1, text : 'Suiza'},
                {id : 2, text : 'Suecia'},
                {id : 3, text : 'Noruega'},
                {id : 4, text : 'Estonia'},
                {id : 5, text : 'Malta'}
            ]
        }
    ];

    // Estatus del usuario
    $scope.userStatus = '';

    // Número de respuestas acertadas
    $scope.validAnswers = 0;

    // Total de respuestas
    $scope.totalAnswers = 0;

    // Valida las preguntas de una sola respuesta
    $scope.validate = function (question) {
        if (question.validAnswer == question.userAnswer) {
            $scope.validAnswers ++;
            question.status = 'ok';
            // Cuando se acierta la pregunta añadir la clase para que se vea el acierto
            $('.question-' + question.id).removeClass('panel-default').addClass('panel-success');
        } else {
            if (question.status == 'ok' && $scope.validAnswers > 0) {
                $scope.validAnswers --;
            }
            question.status = 'error';
            // Cuando se falla añadir la clase para mostrar que se ha fallado
            $('.question-' + question.id).removeClass('panel-default').addClass('panel-danger');
        }

        $scope.totalAnswers ++;
        // Deshabilitar para que no se pueda cambiar la respuesta
        $('.question-' + question.id).attr('disabled', true);
        updateUserStatus();
    };

    //Funcion que cuando se click en un checbox añade o quita respuestas a userAnswer
    $scope.toggleSelection = function toggleSelection(question, answerId) {
        //Comprueba el indice de la respuesta recien marcada (tanto para activar como para desactivar) (answerId) dentro del array de respuestas seleccionadas por el usuario para esa pregunta (userAnswer[] para question)
        var idx = question.userAnswer.indexOf(answerId);

         // Si esa respuesta ya esta dentro, entonces es que acaba de desactivarla y la quita del array de respuestas
        if (idx > -1) {
            question.userAnswer.splice(idx, 1);
        }

         // Si no esta dentro de userAnswer pues entonces la mete
            else {
                question.userAnswer.push(answerId);
            }
    };

    // Valida las preguntas con múltiples respuestas 
    $scope.validateMultiple = function (question){
        //Compara si los dos arrays validAnswer y userAnswer son iguales
        //Hay que ordenar los arrays para realizar bien la comparacion
        if(angular.equals(question.validAnswer.sort(), question.userAnswer.sort())){
            //Una respuesta acertada
            $scope.validAnswers++;
            question.status = 'ok';
            // Al igual que para validar una sola pregunta se añade la clase para mostrar acierto
            $('.question-' + question.id).removeClass('panel-default').addClass('panel-success');
        }else {
            if (question.status == 'ok' && $scope.validAnswers > 0) {
                $scope.validAnswers--;
            }
            $('.question-' + question.id).removeClass('panel-default').addClass('panel-danger');
            question.status = 'error';
        }
        $scope.totalAnswers ++;
        // Deshabilitar para que no se pueda cambiar la respuesta
        $('.question-' + question.id).attr('disabled', true);
        updateUserStatus();
    };

    function updateUserStatus() {
        var avgValidAnswers = ($scope.validAnswers / $scope.questions.length) * 100;
        if (avgValidAnswers === 0) {
            $scope.userStatus = 'Muy mal!';
        } else if (avgValidAnswers === 100) {
            $scope.userStatus = 'Enhorabuena. Eres un crack!';
        } else {
            $scope.userStatus = 'Tienes que mejorar';
        }

        // Cuando se han respondido todas las preguntas se muestra un mensaje
        if($scope.totalAnswers === $scope.questions.length) {
          $('#resultado').modal('show');
        }
    }

}]);
