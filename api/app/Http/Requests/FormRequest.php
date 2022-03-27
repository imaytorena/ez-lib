<?php

namespace App\Http\Requests;

use App\Classes\Utilities;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use Laravel\Lumen\Http\Redirector;
use Illuminate\Container\Container;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Validation\UnauthorizedException;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\ValidatesWhenResolvedTrait;
use Illuminate\Contracts\Validation\ValidatesWhenResolved;
use Illuminate\Contracts\Validation\Factory as ValidationFactory;
use Illuminate\Foundation\Http\FormRequest as HttpFormRequest;


class FormRequest extends HttpFormRequest implements ValidatesWhenResolved
{
    use ValidatesWhenResolvedTrait;
    /**
     * The container instance.
     *
     * @var \Illuminate\Container\Container
     */
    protected $authorizationError = ["message" => "No tienes permiso para acceder.", "code" => 403];
    protected $container;
    /**
     * The redirector instance.
     *
     * @var \Laravel\Lumen\Http\Redirector
     */
    protected $redirector;
    /**
     * The route to redirect to if validation fails.
     *
     * @var string
     */
    protected $redirectRoute;
    /**
     * The controller action to redirect to if validation fails.
     *
     * @var string
     */
    protected $redirectAction;
    /**
     * The key to be used for the view error bag.
     *
     * @var string
     */
    protected $errorBag = 'default';
    /**
     * The input keys that should not be flashed on redirect.
     *
     * @var array
     */
    protected $dontFlash = ['password', 'password_confirmation'];


    protected $utilities;

    public function __construct()
    {
        $this->utilities = new Utilities();
        parent::__construct();
    }

    /**
     * Get the validator instance for the request.
     *
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function getValidatorInstance()
    {
        $factory = $this->container->make(ValidationFactory::class);
        if (method_exists($this, 'validator')) {
            return $this->container->call([$this, 'validator'], compact('factory'));
        }
        return $factory->make(
            $this->validationData(), $this->container->call([$this, 'rules']), $this->messages(), $this->attributes()
        );
    }
    /**
     * Get data to be validated from the request.
     *
     * @return array
     */
    public  function validationData()
    {
        return $this->all();
    }
    /**
     * Handle a failed validation attempt.
     *
     * @param  \Illuminate\Contracts\Validation\Validator  $validator
     * @return void
     *
     * @throws \Illuminate\Http\Exceptions\HttpResponseException
     */
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException($this->response(
            $this->formatErrors($validator)
        ));
    }
    /**
     * Determine if the request passes the authorization check.
     *
     * @return bool
     */
    protected function passesAuthorization()
    {
        if (method_exists($this, 'authorize')) {
            return $this->container->call([$this, 'authorize']);
        }
        return false;
    }
    /**
     * Handle a failed authorization attempt.
     *
     * @return void
     *
     * @throws \Illuminate\Http\Exceptions\HttpResponseException
     */
    protected function failedAuthorization()
    {
        throw new HttpResponseException($this->forbiddenResponse());
    }
    /**
     * Get the proper failed validation response for the request.
     *
     * @param  array  $errors
     * @return \Illuminate\Http\JsonResponse
     */
    public function response(array $errors)
    {
        return new JsonResponse($errors, 422);
    }
    /**
     * Get the response for a forbidden operation.
     *
     * @return JsonResponse
     */
    public function forbiddenResponse()
    {
        return new JsonResponse(["error" => $this->authorizationError], $this->authorizationError['code']);
    }
    /**
     * Format the errors from the given Validator instance.
     *
     * @param  \Illuminate\Contracts\Validation\Validator  $validator
     * @return array
     */
    protected function formatErrors(Validator $validator)
    {
        return $validator->getMessageBag()->toArray();
    }
    /**
     * Get custom messages for validator errors.
     *
     * @return array
     */
    public function messages()
    {
        $messages = $this->utilities->getMessageErrors();
        return $messages;
    }
    /**
     * Get custom attributes for validator errors.
     *
     * @return array
     */
    public function attributes()
    {
        return [
            'username' => 'nombre de usuario',
            'code' => 'código',
            'email' => 'correo electrónico',
            'name' => 'nombre',
            'last_name' => 'apellido',
            'genre' => 'género',
            'status' => 'estado',
            
            'title' => 'título',
            'description' => 'descripción',
            'autor' => 'autor',
            'publisher' => 'editorial',
            'isbn' => 'ISBN',
            'year' => 'año',
            'genre' => 'género',
            'available' => 'disponible',
            'stock' => 'existencias',
        ];
    }

    protected function cleanData()
    {
        $data = $this->validationData();
        foreach ($data as $key => $value) {
            $this->offsetUnset($key);
        }
    }

    // protected function setAuthorizationErrorMessage($message = 'No tienes permiso para acceder.', $statusCode = 403){
    //     $this->authorizationError = [
    //         'message' => $message,
    //         'code' => $statusCode
    //     ];
    // }

}