<?php

namespace App\Http\Requests;

use App\Classes\Utilities;
use Illuminate\Http\JsonResponse;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\ValidatesWhenResolvedTrait;
use Illuminate\Contracts\Validation\ValidatesWhenResolved;
use Illuminate\Contracts\Validation\Factory as ValidationFactory;
use Illuminate\Foundation\Http\FormRequest as HttpFormRequest;
use JetBrains\PhpStorm\Pure;


class FormRequest extends HttpFormRequest implements ValidatesWhenResolved
{
    use ValidatesWhenResolvedTrait;

    /**
     * The container instance.
     *
     */
    protected array $authorizationError = ["message" => "No tienes permiso para acceder.", "code" => 403];
    protected $container;
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

    protected Utilities $utilities;

    public function __construct()
    {
        $this->utilities = new Utilities();
        parent::__construct();
    }

    /**
     * Get the validator instance for the request.
     *
     * @return Validator
     */
    protected function getValidatorInstance(): Validator
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
    public  function validationData(): array
    {
        return $this->all();
    }

    /**
     * Handle a failed validation attempt.
     *
     * @param Validator $validator
     * @return void
     *
     * @throws HttpResponseException
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
    protected function passesAuthorization(): bool
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
     * @throws HttpResponseException
     */
    protected function failedAuthorization()
    {
        throw new HttpResponseException($this->forbiddenResponse());
    }

    /**
     * Get the proper failed validation response for the request.
     *
     * @param  array  $errors
     * @return JsonResponse
     */
    public function response(array $errors): JsonResponse
    {
        return new JsonResponse($errors, 422);
    }

    /**
     * Get the response for a forbidden operation.
     *
     * @return JsonResponse
     */
    public function forbiddenResponse(): JsonResponse
    {
        return new JsonResponse(["error" => $this->authorizationError], $this->authorizationError['code']);
    }

    /**
     * Format the errors from the given Validator instance.
     *
     * @param Validator $validator
     * @return array
     */
    protected function formatErrors(Validator $validator): array
    {
        return $validator->getMessageBag()->toArray();
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array
     */
    #[Pure] public function messages(): array
    {
        return $this->utilities->getMessageErrors();
    }

    /**
     * Get custom attributes for validator errors.
     *
     * @return array
     */
    public function attributes(): array
    {
        return [
            'username' => 'nombre de usuario',
            'code' => 'código',
            'email' => 'correo electrónico',
            'name' => 'nombre',
            'last_name' => 'apellido',

            'title' => 'título',
            'description' => 'descripción',
            'autor' => 'autor',
            'publisher' => 'editorial',
            'isbn' => 'ISBN',
            'year' => 'año',
            'available' => 'disponible',
            'stock' => 'existencias',

            'serial_number' => 'número de serie',
            'option' => 'opción',
            'details' => 'detalles',
            'brand' => 'marca',
            'model' => 'modelo',

            'genre' => 'género',
            'status' => 'estado',
        ];
    }

    /**
     * @return void
     */
    protected function cleanData()
    {
        $data = $this->validationData();
        foreach ($data as $key => $value) {
            $this->offsetUnset($key);
        }
    }
}
